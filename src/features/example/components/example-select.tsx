"use client";

import Select from "react-select";

const options = [
  { value: "react", label: "React" },
  { value: "next", label: "Next.js" },
  { value: "tanstack", label: "TanStack Query" },
];

export default function ExampleSelect() {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-700">Favorite tooling</p>
      <Select
        instanceId="example-select"
        options={options}
        placeholder="Pick a favorite"
        classNamePrefix="react-select"
      />
    </div>
  );
}
