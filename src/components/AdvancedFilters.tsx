import React from 'react';
import { Filter, X } from 'lucide-react';
import { SearchFilters } from '../types';

interface AdvancedFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClose: () => void;
}

export default function AdvancedFilters({ filters, onFiltersChange, onClose }: AdvancedFiltersProps) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Advanced Filters
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Search Type</label>
            <select
              value={filters.searchType}
              onChange={(e) => onFiltersChange({ ...filters, searchType: e.target.value as 'link' | 'comment' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="link">Submissions</option>
              <option value="comment">Comments</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sort By</label>
            <select
              value={filters.sort}
              onChange={(e) => onFiltersChange({ ...filters, sort: e.target.value as SearchFilters['sort'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="relevance">Relevance</option>
              <option value="hot">Hot</option>
              <option value="top">Top</option>
              <option value="new">New</option>
              <option value="comments">Comments</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time Frame</label>
            <select
              value={filters.timeframe}
              onChange={(e) => onFiltersChange({ ...filters, timeframe: e.target.value as SearchFilters['timeframe'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Time</option>
              <option value="year">Past Year</option>
              <option value="month">Past Month</option>
              <option value="week">Past Week</option>
              <option value="day">Past 24 Hours</option>
              <option value="hour">Past Hour</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Result Limit</label>
            <input
              type="number"
              value={filters.limit}
              onChange={(e) => onFiltersChange({ ...filters, limit: parseInt(e.target.value) })}
              min="1"
              max="500"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.showRemoved}
                onChange={(e) => onFiltersChange({ ...filters, showRemoved: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Show Removed Posts</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.showDuplicates}
                onChange={(e) => onFiltersChange({ ...filters, showDuplicates: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Show Duplicates</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.textPostsOnly}
                onChange={(e) => onFiltersChange({ ...filters, textPostsOnly: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Text Posts Only</span>
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}