type ChatFormValues = {
  message: string;
};

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
};

export type { ChatFormValues, ChatMessage };
