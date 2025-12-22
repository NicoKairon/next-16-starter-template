import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DemoCard = () => {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Quickstart
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900">
          App Router starter with the essentials baked in.
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          TanStack Query, React Hook Form + Zod, Zustand, and a pluggable auth contract ready for
          your provider.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link className={cn(buttonVariants(), 'gap-2')} href="/dashboard">
          Explore the app area <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          className={cn(buttonVariants({ variant: 'secondary' }))}
          href="https://nextjs.org/docs"
          rel="noreferrer"
          target="_blank"
        >
          Read the docs
        </a>
      </div>
    </div>
  );
};

export default DemoCard;
