import { create } from "zustand";

export const useFontSizeStore = create((set) => ({
  fontSize: 1,
  setFontSize: (fontSize) => set({ fontSize }),
}));
