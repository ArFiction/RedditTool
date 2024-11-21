import React, { useState } from 'react';
import { Search, Filter, Plus, X, Loader2 } from 'lucide-react';
import { useRedditStore } from '../store/reddit';
import AdvancedFilters from './AdvancedFilters';
import { SearchFilters } from '../types';

const defaultFilters: SearchFilters = {
  searchType: 'link',
  sort: 'relevance',
  limit: 100,
  timeframe: 'month',
  subreddits: ['programming', 'webdev'],
  authors: [],
  excludeKeywords: [],
  titleOnly: false,
  dataSource: 'reddit',
  showRemoved: false,
  showDuplicates: false,
  textPostsOnly: false,
  unviewedOnly: false,
};

export default function SearchPanel() {
  const [keywords, setKeywords] = useState('');
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [newSubreddit, setNewSubreddit] = useState('');

  const { search, isLoading, error } = useRedditStore();

  const handleSearch = () => {
    if (keywords.trim()) {
      search(keywords, filters);
    }
  };

  const addSubreddit = () => {
    if (newSubreddit && !filters.subreddits.includes(newSubreddit)) {
      setFilters({
        ...filters,
        subreddits: [...filters.subreddits, newSubreddit],
      });
      setNewSubreddit('');
    }
  };

  const removeSubreddit = (subreddit: string) => {
    setFilters({
      ...filters,
      subreddits: filters.subreddits.filter(s => s !== subreddit),
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
              Keywords
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="keywords"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter keywords..."
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Subreddits</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                placeholder="Add subreddit..."
                value={newSubreddit}
                onChange={(e) => setNewSubreddit(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSubreddit()}
              />
              <button
                type="button"
                onClick={addSubreddit}
                className="relative -ml-px inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <Plus className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {filters.subreddits.map((subreddit) => (
                <span
                  key={subreddit}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                >
                  r/{subreddit}
                  <button
                    type="button"
                    onClick={() => removeSubreddit(subreddit)}
                    className="ml-2 inline-flex items-center p-0.5 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <div>
            <button
              type="button"
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                'Search'
              )}
            </button>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={() => setShowFilters(true)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              Advanced Filters
            </button>
          </div>
        </div>
      </div>

      {showFilters && (
        <AdvancedFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}
    </>
  );
}