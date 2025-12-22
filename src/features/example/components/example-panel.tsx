"use client";

import { Button } from "@/components/ui/button";
import { useExampleQuery } from "@/features/example/queries";
import { useExampleStore } from "@/features/example/store";

import ExampleForm from "@/features/example/components/example-form";
import ExampleSelect from "@/features/example/components/example-select";

export default function ExamplePanel() {
  const { data, isLoading } = useExampleQuery();
  const count = useExampleStore((state) => state.count);
  const increment = useExampleStore((state) => state.increment);
  const reset = useExampleStore((state) => state.reset);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          TanStack Query
        </p>
        <h3 className="mt-3 text-xl font-semibold text-slate-900">
          {isLoading ? "Loading example payload..." : data?.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {data?.description ?? "No payload yet."}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button type="button" onClick={increment}>
            Increment store ({count})
          </Button>
          <Button type="button" variant="secondary" onClick={reset}>
            Reset
          </Button>
        </div>
      </section>
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Forms
          </p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">
            React Hook Form + Zod
          </h3>
        </div>
        <ExampleForm />
        <ExampleSelect />
      </section>
    </div>
  );
}
