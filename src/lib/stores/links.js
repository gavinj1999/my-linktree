import { writable } from 'svelte/store';

export const links = writable([
  { title: 'Twitter', url: 'https://twitter.com', color: '#83c5be' },
  { title: 'GitHub', url: 'https://github.com', color: '#e29578' }
]);