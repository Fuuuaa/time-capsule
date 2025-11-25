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
};

export const useCapsules = create<CapsuleStore>((set) => ({
  capsules: [],
  addCapsule: (c) =>
    set((state) => ({
      capsules: [...state.capsules, c],
    })),
}));
