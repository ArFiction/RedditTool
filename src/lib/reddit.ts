import { SearchFilters, SearchResult } from '../types';
import { API_BASE_URL, OAUTH_BASE_URL, PROXY_URL } from './config';

const REDDIT_CLIENT_ID = import.meta.env.VITE_REDDIT_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export const getAuthUrl = () => {
  const state = Math.random().toString(36).substring(7);
  localStorage.setItem('reddit_auth_state', state);
  
  const params = new URLSearchParams({
    client_id: REDDIT_CLIENT_ID,
    response_type: 'code',
    state,
    redirect_uri: REDIRECT_URI,
    duration: 'temporary',
    scope: 'read',
  });

  return `${API_BASE_URL}/api/v1/authorize?${params.toString()}`;
};

export const handleRedirect = async (code: string, state: string) => {
  const savedState = localStorage.getItem('reddit_auth_state');
  if (state !== savedState) {
    throw new Error('Invalid state parameter');
  }

  const response = await fetch('http://localhost:4000/api/reddit/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'RedditLens/1.0.0',
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Token endpoint error:', errorData);
    throw new Error('Failed to get access token');
  }

  const data = await response.json();
  localStorage.setItem('reddit_access_token', data.access_token);
  return data;
};

export const searchReddit = async (
  query: string,
  filters: SearchFilters
): Promise<SearchResult[]> => {
  const token = localStorage.getItem('reddit_access_token');
  if (!token) {
    throw new Error('Not authenticated');
  }

  let searchQuery = query;

  // Add boolean operators
  if (filters.booleanOperators) {
    searchQuery = filters.booleanOperators
      .map(op => `(${op.terms.join(` ${op.operator} `)})`)
      .join(' AND ');
  }

  // Add title specific search
  if (filters.titleOnly) {
    searchQuery = `title:${searchQuery}`;
  }

  // Construct the search parameters
  const params = new URLSearchParams({
    q: searchQuery,
    sort: filters.sort || 'relevance',
    t: filters.timeframe || 'all',
    limit: (filters.limit || 25).toString(),
    type: filters.searchType || 'link',
    raw_json: '1'
  });

  try {
    const response = await fetch(`${OAUTH_BASE_URL}/search?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'RedditLens/1.0.0',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('reddit_access_token');
        throw new Error('Authentication expired. Please login again.');
      }
      throw new Error(`Reddit API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.data || !data.data.children) {
      return [];
    }

    return data.data.children
      .filter((child: any) => {
        if (!child.data) return false;
        // Apply filters
        if (filters.excludeKeywords?.some(keyword => 
          child.data.title.toLowerCase().includes(keyword.toLowerCase()) ||
          (child.data.selftext && child.data.selftext.toLowerCase().includes(keyword.toLowerCase()))
        )) return false;
        return true;
      })
      .map((child: any) => ({
        id: child.data.id,
        title: child.data.title,
        content: child.data.selftext || '',
        subreddit: child.data.subreddit,
        upvotes: child.data.ups,
        comments: child.data.num_comments,
        timestamp: new Date(child.data.created_utc * 1000).toISOString(),
        author: child.data.author,
        flair: child.data.link_flair_text,
        status: child.data.removed_by_category ? 'removed' : 
                child.data.author === '[deleted]' ? 'deleted' : 'live',
        url: `https://reddit.com${child.data.permalink}`,
      }));
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

// Add refresh token functionality
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('reddit_refresh_token');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${REDDIT_CLIENT_ID}:`)}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  localStorage.setItem('reddit_access_token', data.access_token);
  return data.access_token;
};