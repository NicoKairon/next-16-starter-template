import Link from 'next/link';
import type { ReactNode } from 'react';

const PUBLIC_LAYOUT_CLASSES =
  'min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900';

type PublicLayoutProps = {
  children: ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className={PUBLIC_LAYOUT_CLASSES}>
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-sm font-semibold uppercase tracking-[0.2em]">Next Template</span>
        <nav className="flex items-center gap-4 text-sm text-slate-600">
          <Link className="transition hover:text-slate-900" href="/dashboard">
            App
          </Link>
          <a
            className="rounded-full border border-slate-300 px-4 py-2 text-slate-700 transition hover:border-slate-400"
            href="https://nextjs.org/docs"
            rel="noreferrer"
            target="_blank"
          >
            Docs
          </a>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default PublicLayout;
