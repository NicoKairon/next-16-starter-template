import { Sparkles, X } from 'lucide-react';

type Props = {
  onClose: () => void;
};

const ChatHeader = ({ onClose }: Props) => {
  return (
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
      <button
        aria-label="Close chat"
        className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
        onClick={onClose}
        type="button"
      >
        <X className="h-4 w-4" />
      </button>
    </header>
  );
};

export default ChatHeader;
