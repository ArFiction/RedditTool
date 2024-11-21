import { create } from 'zustand';
import { getAuthUrl, handleRedirect, searchReddit } from '../lib/reddit';
import { SearchResult, SearchFilters } from '../types';

interface RedditStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  results: SearchResult[];
  login: () => void;
  handleAuthCallback: (code: string, state: string) => Promise<void>;
  search: (keywords: string, filters: SearchFilters) => Promise<void>;
  clearError: () => void;
}

export const useRedditStore = create<RedditStore>((set) => ({
  isAuthenticated: Boolean(localStorage.getItem('reddit_access_token')),
  isLoading: false,
  error: null,
  results: [],

  login: () => {
    window.location.href = getAuthUrl();
  },

  handleAuthCallback: async (code, state) => {
    set({ isLoading: true, error: null });
    try {
      const data = await handleRedirect(code, state);
      if (data.access_token) {
        localStorage.setItem('reddit_access_token', data.access_token);
        set({ isAuthenticated: true });
      } else {
        throw new Error('No access token received');
      }
    } catch (error) {
      console.error('Auth callback error:', error);
      set({ error: (error as Error).message });
      throw error; // Re-throw to be caught by the component
    } finally {
      set({ isLoading: false });
    }
  },

  search: async (keywords, filters) => {
    set({ isLoading: true, error: null });
    try {
      const results = await searchReddit(keywords, filters);
      set({ results });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));