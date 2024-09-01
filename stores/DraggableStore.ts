import { create } from "zustand";

export const useDraggableStore: any = create((set) => ({
  isDragging: false,
  elementName: "",
  lastElement: "",
  description: null,
  elementDescription: "",
  setIsDragging: (isDragging) => set({ isDragging }),
  setElementName: (elementName) => set((state) => {

    const lastElement = state.elementName

    return {
      elementName: elementName,
      lastElement: lastElement,
    }
  }),
  setDescription: (description) => set((state) => {
    return {
      description: description,
    }
  }),
  setElementDescription: (elementDescription) => set((state) => {
    return {
      elementDescription: elementDescription,
    }
  }),
}));