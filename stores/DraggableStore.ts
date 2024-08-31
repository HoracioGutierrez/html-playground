import { create } from "zustand";

export const useDraggableStore: any = create((set) => ({
  isDragging: false,
  elementName: "",
  lastElement: "",
  setIsDragging: (isDragging) => set({ isDragging }),
  setElementName: (elementName) => set((state) => {

    const lastElement = state.elementName

    return {
      elementName: elementName,
      lastElement: lastElement,
    }
  }),
}));