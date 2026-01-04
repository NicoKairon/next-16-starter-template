import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types';

const renderContent = (text: string) => {
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

type Props = {
  items: ChatMessage[];
};

const ChatHistory = (props: Props) => {
  // PROPS
  const { items } = props;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100 px-4 py-4 sm:flex-none sm:min-h-[320px] sm:max-h-[420px]">
      {items.map((message) => {
        const isUser = message.role === 'user';

        return (
          <div
            key={message.id}
            className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}
          >
            <div
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm',
                isUser
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'border border-slate-200/80 bg-slate-50 text-slate-900 shadow-sm',
              )}
            >
              <p className="leading-relaxed">
                {isUser ? message.content : renderContent(message.content)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatHistory;
