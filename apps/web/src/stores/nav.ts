import { NavProps } from '@/components/ui/nav';
import { create } from 'zustand';

type NavItem = NavProps['links'][number];

interface NavStore {
  // state
  nav?: NavItem;

  // actions
  setNav: (nav?: NavItem) => void;
}

export const useNavStore = create<NavStore>((set) => ({
  nav: undefined,
  setNav: (nav) => set({ nav }),
}));
