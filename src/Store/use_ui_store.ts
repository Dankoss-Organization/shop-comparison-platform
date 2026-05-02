/**
 * @file use_ui_store.ts
 * @description Zustand store for shared UI state — profile dropdown open/highlight.
 * Allows any page or component to open the profile dropdown and trigger
 * the Sign In button bounce animation without prop drilling or DOM events.
 */

import { create } from "zustand";

interface UIState {
  isProfileOpen: boolean;
  highlightLogin: boolean;
  favoriteAuthHint: { type: "success" | "error"; title: string; message: string } | null;
  openProfileWithLoginHint: () => void;
  triggerAuthSuccessHint: () => void;
  triggerAuthRequiredHint: () => void;
  setProfileOpen: (open: boolean) => void;
  clearHighlight: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isProfileOpen: false,
  highlightLogin: false,
  favoriteAuthHint: null,

  openProfileWithLoginHint: () => {
    set({ isProfileOpen: true, highlightLogin: true });
    setTimeout(() => set({ highlightLogin: false }), 2600);
  },

  triggerAuthSuccessHint: () => {
    set({
      favoriteAuthHint: {
        type: "success",
        title: "Signed in successfully",
        message: "Your favorites are ready. Tap the heart icon to open them.",
      },
    });
    setTimeout(() => set({ favoriteAuthHint: null }), 3200);
  },

  triggerAuthRequiredHint: () => {
    set({
      favoriteAuthHint: {
        type: "error",
        title: "Sign in required",
        message: "Log in or register first to open and sync your favorites.",
      },
    });
    setTimeout(() => set({ favoriteAuthHint: null }), 3200);
  },

  setProfileOpen: (open) => set({ isProfileOpen: open }),

  clearHighlight: () => set({ highlightLogin: false }),
}));