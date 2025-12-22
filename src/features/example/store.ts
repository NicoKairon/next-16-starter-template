import { create } from "zustand";

type ExampleState = {
  count: number;
  increment: () => void;
  reset: () => void;
};

export const useExampleStore = create<ExampleState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));
