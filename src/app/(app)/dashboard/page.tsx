import ExamplePanel from "@/features/example/components/example-panel";

export default function DashboardPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-16">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          App Workspace
        </p>
        <h1 className="text-3xl font-semibold text-slate-100">
          Feature playground
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          This area shows the default data, form, and state setups in action.
        </p>
      </header>
      <ExamplePanel />
    </main>
  );
}
