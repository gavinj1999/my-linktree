import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase';

export const auth = writable({ isAuthenticated: false, user: null });

// Sync auth state with Supabase
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    auth.set({ isAuthenticated: true, user: session.user });
  } else {
    auth.set({ isAuthenticated: false, user: null });
  }
});