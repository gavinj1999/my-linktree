import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase';
import { auth } from './auth';

export const links = writable([]);

// Load links when user is authenticated
auth.subscribe(async ({ isAuthenticated, user }) => {
  if (isAuthenticated && user) {
    const { data, error } = await supabase.from('links').select('*').eq('user_id', user.id);
    if (!error) {
      links.set(data || []);
    }
  } else {
    links.set([]);
  }
});