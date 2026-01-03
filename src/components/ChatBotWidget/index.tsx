'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, MoonStar, SendHorizonal, Sparkles, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { beerProfiles, surrealisteBasics } from '@/data/exampleDataContent';
import { cn } from '@/lib/utils';

// TODO: Improve this component, separate the logic to helper functions, move the types to correct file. Remove unnecessary logic, now it's fully wired to ai chatbot

type Message = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  quickReplies?: string[];
};

type PreferenceState = { stage: 'idle' } | { stage: 'style' } | { stage: 'mood'; style: string };

const styleChoices = ['Bright & crisp', 'Hoppy & citrus', 'Malty & dark', 'Fruity & playful'];

const moodChoices = ['Easygoing', 'Adventurous', 'Lingering sips'];

const poeticAsides = [
  'Somewhere between the copper kettles, a quiet song hums along.',
  'Time slows the way foam settles on a well-poured glass.',
  'The night air tastes of hops, memory, and small rebellions.',
  'Good beer is a compass; it points you back to yourself.',
];

function createId() {
  return Math.random().toString(36).slice(2);
}

function enrichTone(text: string, philosophical: boolean) {
  if (!philosophical) return text;
  const aside = poeticAsides[Math.floor(Math.random() * poeticAsides.length)] ?? poeticAsides[0];
  return `${text} ${aside}`;
}

function formatHours() {
  return surrealisteBasics.hours.map((slot) => `${slot.label}: ${slot.value}`).join(' | ');
}

function findBeer(style: string, mood?: string) {
  const match = beerProfiles.find((beer) => {
    const fitsStyle = beer.bestFor.includes(style);
    const fitsMood = mood ? beer.bestFor.includes(mood) : true;
    return fitsStyle && fitsMood;
  });
  if (match) return match;
  return beerProfiles[0];
}
export default function ConciergeWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: createId(),
      role: 'assistant',
      content:
        'Bonjour! I am the Surrealiste concierge. Ask me about hours, bookings, or let me suggest a beer.',
    },
  ]);
  const [input, setInput] = useState('');
  const [philosophicalMode, setPhilosophicalMode] = useState(false);
  const [preferences, setPreferences] = useState<PreferenceState>({
    stage: 'idle',
  });
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const quickActionLabels = useMemo(
    () => [
      'Recommend me a beer',
      'When are you open?',
      'Where are you?',
      'Book a table',
      'Do you do brewery tours?',
    ],
    [],
  );

  const handleQuickAction = (value: string) => {
    if (isSending) return;
    void handleSend(value);
  };

  const handleSend = async (value?: string) => {
    const trimmed = (value ?? input).trim();
    if (!trimmed || isSending) return;

    const userMessage: Message = { id: createId(), role: 'user', content: trimmed };
    const nextMessages: Message[] = [...messages, userMessage];

    setMessages(nextMessages);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok) {
        throw new Error('Gemini request failed');
      }

      const data = await response.json();
      console.log('data', data);
      const replyText = data?.reply
        ? data.reply
        : 'I did not get a response. Please try again in a moment.';

      const assistantMessage: Message = {
        id: createId(),
        role: 'assistant',
        content: enrichTone(replyText, philosophicalMode),
      };

      setMessages([...nextMessages, assistantMessage]);
    } catch (error) {
      console.error(error);
      const assistantReplies = buildAssistantReply(trimmed, preferences).map((reply) => ({
        ...reply,
        content: enrichTone(reply.content, philosophicalMode),
      }));
      setMessages([...nextMessages, ...assistantReplies]);
    } finally {
      setIsSending(false);
    }
  };

  const buildAssistantReply = (text: string, pref: PreferenceState): Message[] => {
    const lower = text.toLowerCase();

    if (pref.stage === 'style') {
      const style = styleChoices.find((choice) =>
        lower.includes(choice.toLowerCase().split(' ')[0]),
      );
      if (style) {
        setPreferences({ stage: 'mood', style });
        return [
          {
            id: createId(),
            role: 'assistant',
            content: `Noted: ${style.toLowerCase()}. How are you drinking tonight?`,
            quickReplies: moodChoices,
          },
        ];
      }
    }

    if (pref.stage === 'mood') {
      const mood = moodChoices.find((choice) => lower.includes(choice.toLowerCase().split(' ')[0]));
      if (mood && pref.style) {
        setPreferences({ stage: 'idle' });
        const beer = findBeer(pref.style, mood);
        return [
          {
            id: createId(),
            role: 'assistant',
            content: `Try the ${beer.name} (${beer.style}). ${beer.notes}. Ask at the bar and they'll pour it fresh.`,
          },
        ];
      }
    }

    if (lower.includes('beer') || lower.includes('recommend') || lower.includes('pair')) {
      setPreferences({ stage: 'style' });
      return [
        {
          id: createId(),
          role: 'assistant',
          content: "Let's pick a beer. What mood fits you right now? Choose a flavor lane.",
          quickReplies: styleChoices,
        },
      ];
    }

    if (lower.includes('hour') || lower.includes('open') || lower.includes('close')) {
      return [
        {
          id: createId(),
          role: 'assistant',
          content: `Taproom hours: ${formatHours()}. Kitchen until ${surrealisteBasics.kitchen}.`,
        },
      ];
    }

    if (
      lower.includes('address') ||
      lower.includes('where') ||
      lower.includes('located') ||
      lower.includes('location')
    ) {
      return [
        {
          id: createId(),
          role: 'assistant',
          content: `${surrealisteBasics.address}. ${surrealisteBasics.directions}`,
        },
      ];
    }

    if (
      lower.includes('book') ||
      lower.includes('reservation') ||
      lower.includes('reserve') ||
      lower.includes('table')
    ) {
      return [
        {
          id: createId(),
          role: 'assistant',
          content: `Bookings go through our portal: ${surrealisteBasics.reservationLink}. ${surrealisteBasics.reservationNote}`,
        },
      ];
    }

    if (lower.includes('tour')) {
      return [
        {
          id: createId(),
          role: 'assistant',
          content: `${surrealisteBasics.tours} Use the booking link (${surrealisteBasics.reservationLink}) and add a note for "brewery tour".`,
        },
      ];
    }

    if (lower.includes('group') || lower.includes('event') || lower.includes('private')) {
      return [
        {
          id: createId(),
          role: 'assistant',
          content: `For groups or private hires, email ${surrealisteBasics.groupEmail} with your date and headcount. We will hold space and confirm via the booking portal.`,
        },
      ];
    }

    if (lower.includes('info') || lower.includes('about') || lower.includes('story')) {
      return [
        {
          id: createId(),
          role: 'assistant',
          content: surrealisteBasics.about,
        },
      ];
    }

    return [
      {
        id: createId(),
        role: 'assistant',
        content:
          'I can help with hours, address, bookings, tours, groups, and beer picks. If you need something else, I can point you to the team at the bar.',
      },
    ];
  };

  const renderAssistantContent = (text: string) => {
    const emphasisPattern = /(\*\*[^*]+\*\*)/g;
    const lines = text.split('\n');

    return lines.map((line, lineIndex) => (
      <span key={`line-${lineIndex}`}>
        {line.split(emphasisPattern).map((part, partIndex) => {
          if (!part) return null;
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={`bold-${lineIndex}-${partIndex}`}>{part.slice(2, -2)}</strong>;
          }
          return <span key={`text-${lineIndex}-${partIndex}`}>{part}</span>;
        })}
        {lineIndex < lines.length - 1 ? <br /> : null}
      </span>
    ));
  };

  const renderMessage = (message: Message) => {
    const isUser = message.role === 'user';
    return (
      <div key={message.id} className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}>
        <div
          className={cn(
            'max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm',
            isUser
              ? 'bg-slate-900 text-white shadow-md'
              : 'border border-slate-200/80 bg-slate-50 text-slate-900 shadow-sm',
          )}
        >
          <p className="leading-relaxed">
            {isUser ? message.content : renderAssistantContent(message.content)}
          </p>
          {message.quickReplies ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {message.quickReplies.map((reply) => (
                <Button
                  key={reply}
                  className="h-auto px-3 py-1 text-xs"
                  size="sm"
                  variant="secondary"
                  onClick={() => handleQuickAction(reply)}
                >
                  {reply}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 w-auto sm:inset-auto sm:bottom-6 sm:right-6 sm:w-full sm:max-w-md">
      {isOpen ? (
        <div className="flex h-[70vh] flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/95 shadow-2xl shadow-slate-900/10 backdrop-blur sm:h-auto">
          <header className="flex items-center justify-between border-b border-slate-200/70 bg-white/80 px-4 py-3 text-slate-900">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Concierge</p>
                <p className="text-sm font-semibold">Surrealiste AI host</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className={cn(
                  'flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition',
                  philosophicalMode
                    ? 'border-amber-300 bg-amber-50 text-amber-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
                )}
                onClick={() => setPhilosophicalMode((mode) => !mode)}
                type="button"
              >
                <MoonStar className="h-3.5 w-3.5" />
                {philosophicalMode ? 'Poetic on' : 'Poetic off'}
              </button>
              <button
                aria-label="Close chat"
                className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>
          <div
            className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100 px-4 py-4 sm:flex-none sm:min-h-[320px] sm:max-h-[420px]"
            ref={scrollRef}
          >
            {messages.map(renderMessage)}
          </div>
          <div className="flex flex-col gap-2 border-t border-slate-200/70 bg-white px-3 py-3">
            <div className="flex gap-2 sm:flex-row">
              <Input
                aria-label="Message Surrealiste concierge"
                className="h-10 rounded-full border-slate-200/80 bg-slate-50/80 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-slate-400/30"
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask about hours, bookings, or beer..."
                value={input}
              />
              <Button
                className="h-10 w-10 shrink-0 rounded-full bg-slate-900 p-0 text-white shadow-md shadow-slate-900/20 transition hover:bg-slate-800"
                disabled={isSending}
                type="button"
                variant="default"
                onClick={() => handleSend()}
              >
                <SendHorizonal className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickActionLabels.map((label) => (
                <button
                  key={label}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                  type="button"
                  onClick={() => handleQuickAction(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <button
          className="flex items-center gap-2 rounded-full border border-slate-200/70 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/10 transition hover:-translate-y-px hover:border-slate-300 hover:bg-slate-50"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <MessageCircle className="h-4 w-4" />
          Chat with AI Host
        </button>
      )}
    </div>
  );
}
