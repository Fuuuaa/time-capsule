import { create } from "zustand";

export type Capsule = {
  id: string;
  title: string;
  message: string;
  openAt: string;
  createdAt: string;
};

type CapsuleStore = {
  capsules: Capsule[];
  addCapsule: (c: Capsule) => void;
  removeCapsule: (id: string) => void;
  load: () => void;
};

export const useCapsules = create<CapsuleStore>((set) => ({
  capsules: [],

  addCapsule: (c) =>
    set((state) => {
      const updated = [...state.capsules, c];
      localStorage.setItem("capsules", JSON.stringify(updated));
      return { capsules: updated };
    }),

  removeCapsule: (id) =>
    set((state) => {
      const updated = state.capsules.filter((c) => c.id !== id);
      localStorage.setItem("capsules", JSON.stringify(updated));
      return { capsules: updated };
    }),

  load: () => {
    const saved = localStorage.getItem("capsules");
    if (saved) {
      set({ capsules: JSON.parse(saved) });
    }
  },
}));
