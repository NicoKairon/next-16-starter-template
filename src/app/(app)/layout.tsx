import Link from 'next/link';
import type { ReactNode } from 'react';

const APP_LAYOUT_CLASSES = 'min-h-screen bg-slate-950 text-slate-50';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className={APP_LAYOUT_CLASSES}>
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-sm font-semibold uppercase tracking-[0.2em]">App Workspace</span>
        <nav className="text-sm text-slate-400">
          <Link className="transition hover:text-slate-200" href="/">
            Back to public site
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default AppLayout;
