import { create } from "zustand";

interface UIState {
    isSidebarMenuOpen: boolean;

    openSidebarMenu: () => void;
    closeSidebarMenu: () => void;
}

export const useUIState = create<UIState>((set) => ({
    isSidebarMenuOpen: false,

    openSidebarMenu: () => set((state) => ({ isSidebarMenuOpen: true })),
    closeSidebarMenu: () => set((state) => ({ isSidebarMenuOpen: false })),
}));
