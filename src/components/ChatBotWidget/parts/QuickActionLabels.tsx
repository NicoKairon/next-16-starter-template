type Props = {
  handleQuickAction: (value: string) => void;
};

const quickActionLabels = [
  'Recommend me a beer',
  'When are you open?',
  'Where are you?',
  'Book a table',
  'Do you do brewery tours?',
];

const QuickActionLabels = ({ handleQuickAction }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {quickActionLabels.map((label) => (
        <button
          key={label}
          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          type="button"
          onClick={() => void handleQuickAction(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default QuickActionLabels;
