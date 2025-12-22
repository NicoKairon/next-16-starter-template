"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const exampleSchema = z.object({
  name: z.string().min(2, "Add at least 2 characters."),
  email: z.string().email("Add a valid email address."),
});

type ExampleFormValues = z.infer<typeof exampleSchema>;

export default function ExampleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExampleFormValues>({
    resolver: zodResolver(exampleSchema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = (values: ExampleFormValues) => {
    console.info("Form submitted", values);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="name">
          Name
        </label>
        <Input id="name" placeholder="Ada Lovelace" {...register("name")} />
        {errors.name ? (
          <p className="text-xs text-rose-500">{errors.name.message}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="ada@domain.com"
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-xs text-rose-500">{errors.email.message}</p>
        ) : null}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
