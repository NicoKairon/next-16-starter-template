import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatFormValues } from '@/types';
import { SendHorizonal } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  onSubmit: (values: ChatFormValues) => void | Promise<void>;
  methods: UseFormReturn<ChatFormValues>;
};

const ChatComposer = (props: Props) => {
  // PROPS
  const { onSubmit, methods } = props;

  // METHODS
  const { handleSubmit, register, setValue } = methods;

  const handleFormSubmit = handleSubmit((values) => {
    setValue('message', '', { shouldDirty: false, shouldTouch: false });
    void onSubmit(values);
  });

  return (
    <form
      className="flex flex-col gap-2 border-t border-slate-200/70 bg-white px-3 py-3"
      onSubmit={handleFormSubmit}
    >
      <div className="flex gap-2 sm:flex-row">
        <Input
          {...register('message', {
            validate: (value) => value.trim().length > 0,
          })}
          className="h-10 rounded-full border-slate-200/80 bg-slate-50/80 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-slate-400/30"
          placeholder="Ask about hours, bookings, or beer..."
          aria-label="Message Surrealiste concierge"
        />
        <Button
          className="h-10 w-10 shrink-0 rounded-full bg-slate-900 p-0 text-white shadow-md shadow-slate-900/20 transition hover:bg-slate-800"
          type="submit"
          variant="default"
        >
          <SendHorizonal className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default ChatComposer;
