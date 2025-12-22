import DemoCard from "@/components/demo-card";

export default function PublicHomePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-10">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Next.js 16 App Router
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
            Build faster with a reusable starter that stays out of your way.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-600">
            This template ships with typed data fetching, resilient forms, and a
            pluggable auth surface so teams can layer on providers without
            touching core flows.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
              TanStack Query
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
              React Hook Form + Zod
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
              Zustand + shadcn/ui
            </span>
          </div>
        </div>
        <DemoCard />
      </section>
    </main>
  );
}
