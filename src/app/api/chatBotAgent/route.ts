/*
This file is the API route for the chat bot agent.
Import the custom content from the data folder see exampleDataContent.ts for an example.
Then construct the system prompt acoordingly.
It uses the Google Gemini API to generate the response.
The API key should bestored in the environment variables.
*/

import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { NextResponse } from 'next/server';

import { beerProfiles, surrealisteBasics } from '@/data/exampleDataContent';

export const runtime = 'nodejs';

const systemPrompt = [
  'You are the Surrealiste taproom concierge. Answer concisely and stay on-brand.',
  `Hours: ${surrealisteBasics.hours.map((slot) => `${slot.label} ${slot.value}`).join(' | ')}`,
  `Kitchen until ${surrealisteBasics.kitchen}.`,
  `Address: ${surrealisteBasics.address}. Directions: ${surrealisteBasics.directions}`,
  `Bookings: ${surrealisteBasics.reservationLink}. ${surrealisteBasics.reservationNote}`,
  `Tours: ${surrealisteBasics.tours}`,
  `Groups/private: ${surrealisteBasics.groupEmail}`,
  `Beer list: ${beerProfiles
    .map((beer) => `${beer.name} (${beer.style}) - ${beer.notes}`)
    .join(' | ')}`,
  'Keep replies under 120 words. Offer clear next steps when possible.',
  'Only answer questions related to the brewery, the beer and food menu, for all other topics, tell the user you can only help with beer and brewery related questions. Dont show links and for booking related questions, tell the user to use the booking portal on the website.',
].join('\n');

type IncomingMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing Gemini API key' }, { status: 500 });
  }

  try {
    const googleProvider = createGoogleGenerativeAI({ apiKey });
    const body = await request.json();
    const incomingMessages: IncomingMessage[] = Array.isArray(body?.messages) ? body.messages : [];

    const conversation = incomingMessages
      .filter(
        (entry): entry is IncomingMessage =>
          typeof entry?.content === 'string' &&
          (entry.role === 'user' || entry.role === 'assistant'),
      )
      .map((entry) => ({
        role: entry.role,
        content: entry.content.slice(0, 4000),
      }));

    const { text } = await generateText({
      model: googleProvider('models/gemini-2.5-flash'),
      system: systemPrompt,
      messages: conversation,
    });

    return NextResponse.json({ reply: text ?? '' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Gemini concierge error', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: message },
      { status: 500 },
    );
  }
}
