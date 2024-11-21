export interface SearchResult {
  id: string;
  title: string;
  content: string;
  subreddit: string;
  upvotes: number;
  comments: number;
  timestamp: string;
  author: string;
  flair?: string;
  status: 'live' | 'removed' | 'deleted';
  url: string;
}

export interface BooleanOperator {
  operator: 'AND' | 'OR' | 'NOT';
  terms: string[];
}

export interface SearchFilters {
  sort?: 'relevance' | 'hot' | 'top' | 'new' | 'comments';
  timeframe?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
  limit?: number;
  searchType?: 'link' | 'comment';
  titleOnly?: boolean;
  excludeKeywords?: string[];
  booleanOperators?: Array<{
    operator: 'AND' | 'OR' | 'NOT';
    terms: string[];
  }>;
}