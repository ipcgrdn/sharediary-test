import { create } from 'zustand'

const useOpenStore = create((set) => ({
  open: true, 
  setOpen: () => set((state) => ({ open: !state.open })),
}));


const useModalStore = create((set) => ({
  modal: false, 
  setModal: () => set((state) => ({ modal: !state.modal })),
}));

export {useOpenStore, useModalStore}