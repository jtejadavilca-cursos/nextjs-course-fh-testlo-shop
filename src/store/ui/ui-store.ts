import { create } from "zustand";

interface UIState {
    isSidebarMenuOpen: boolean;

    openSidebarMenu: () => void;
    closeSidebarMenu: () => void;
}

export const useUIState = create<UIState>((set) => ({
    isSidebarMenuOpen: false,

    openSidebarMenu: () => set(() => ({ isSidebarMenuOpen: true })),
    closeSidebarMenu: () => set(() => ({ isSidebarMenuOpen: false })),
}));
