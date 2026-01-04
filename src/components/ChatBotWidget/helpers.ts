import type { ChatMessage } from '@/types';

type ReplyPayload = {
  reply?: string | null;
};

export const createMessageId = () => Math.random().toString(36).slice(2, 10);

export const toApiMessages = (messages: ChatMessage[]) =>
  messages.map(({ role, content }) => ({ role, content }));

export const getReplyText = (data: ReplyPayload | null) => {
  const reply = data?.reply;
  if (typeof reply === 'string' && reply.trim().length > 0) {
    return reply;
  }
  return 'I did not get a response. Please try again in a moment.';
};
