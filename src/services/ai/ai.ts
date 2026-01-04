import type { ChatBotAgentResponse, ChatMessage } from '@/types';
import { apiClient } from '@/lib/http/axios';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';

const fetchChatBotAgent = async (messages: ChatMessage[]): Promise<ChatBotAgentResponse> => {
  const response = await apiClient.post<ChatBotAgentResponse>('/api/chatBotAgent', {
    messages: messages.map(({ role, content }) => ({ role, content })),
  });

  return response.data;
};

const useChatBotAgent = (): UseMutationResult<ChatBotAgentResponse, Error, ChatMessage[]> => {
  return useMutation({
    mutationFn: (messages: ChatMessage[]) => fetchChatBotAgent(messages),
  });
};

export { useChatBotAgent };
