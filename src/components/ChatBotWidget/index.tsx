'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageCircle } from 'lucide-react';

import { createMessageId } from './helpers';
import type { ChatMessage, ChatFormValues } from '@/types';

import ChatHeader from './parts/ChatHeader';
import { useChatBotAgent } from '@/services/ai';
import ChatComposer from './parts/ChatComposer';
import ChatHistory from './parts/ChatHistory';

const defaultMessage: ChatMessage[] = [
  {
    id: createMessageId(),
    role: 'assistant',
    content:
      'Bonjour! I am the Surrealiste concierge. Ask me about hours, bookings, or let me suggest a beer.',
  },
];

const ChatBotWidget = (): React.JSX.Element => {
  // STATE
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => defaultMessage);

  // RHF
  const methods = useForm<ChatFormValues>({
    defaultValues: { message: '' },
    mode: 'onChange',
  });

  //RQ
  const { mutateAsync: sendPrompt, isPending } = useChatBotAgent();

  // REF
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // EFFECTS
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  // METHODS
  const handleSubmitMessage = async (formValues: ChatFormValues) => {
    const trimmed = formValues.message.trim();
    if (!trimmed || isPending) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { id: createMessageId(), role: 'user', content: trimmed },
    ];

    // Optimistically render the user message.
    setMessages(nextMessages);
    console.log('submitted:', nextMessages);
    try {
      const response = await sendPrompt(nextMessages);
      const reply = response?.reply?.trim();
      if (!reply) return;

      setMessages((prev) => [
        ...prev,
        { id: createMessageId(), role: 'assistant', content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId(),
          role: 'assistant',
          content: 'Sorry — something went wrong while contacting the AI. Please try again.',
        },
      ]);
    }
  };

  return (
    <div className="fixed left-0 bottom-3 mx-4 z-40 w-auto sm:left-6 sm:bottom-6 sm:w-full sm:max-w-sm">
      {isOpen ? (
        <div className="flex h-[70vh] flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/95 shadow-2xl shadow-slate-900/10 backdrop-blur sm:h-auto">
          <ChatHeader onClose={() => setIsOpen(false)} />
          <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto sm:flex-none">
            <ChatHistory items={messages} />
          </div>
          <ChatComposer onSubmit={handleSubmitMessage} methods={methods} />
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
};

export default ChatBotWidget;
