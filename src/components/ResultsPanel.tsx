import React from 'react';
import { MessageSquare, ArrowUp, Bookmark } from 'lucide-react';
import { SearchResult } from '../types';

interface ResultsPanelProps {
  results: SearchResult[];
}

export default function ResultsPanel({ results }: ResultsPanelProps) {
  if (results.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <img
          src="https://images.unsplash.com/photo-1432888622747-4eb9a8f2c1d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Empty state"
          className="mx-auto h-48 w-auto object-cover rounded-lg mb-4"
        />
        <h3 className="text-lg font-medium text-gray-900">No results yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Start by entering keywords and selecting subreddits to search
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <div key={result.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{result.title}</h3>
              <p className="mt-1 text-sm text-gray-500">
                Posted in r/{result.subreddit} • {new Date(result.timestamp).toLocaleDateString()}
              </p>
            </div>
            <button className="text-gray-400 hover:text-gray-500">
              <Bookmark className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-3 text-gray-600">{result.content}</p>
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center text-gray-500">
              <ArrowUp className="h-5 w-5 mr-1" />
              <span>{result.upvotes}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <MessageSquare className="h-5 w-5 mr-1" />
              <span>{result.comments}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}