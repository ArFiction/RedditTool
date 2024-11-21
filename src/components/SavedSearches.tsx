import React from 'react';
import { Clock, Trash2 } from 'lucide-react';

export default function SavedSearches() {
  const savedSearches = [
    {
      id: '1',
      keywords: 'react hooks tutorial',
      subreddits: ['reactjs', 'javascript'],
      lastRun: '2024-03-10T10:00:00Z',
    },
    {
      id: '2',
      keywords: 'web development career',
      subreddits: ['webdev', 'cscareerquestions'],
      lastRun: '2024-03-09T15:30:00Z',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Saved Searches</h2>
      <div className="space-y-4">
        {savedSearches.map((search) => (
          <div
            key={search.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-indigo-200 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{search.keywords}</h3>
                <div className="mt-1 text-sm text-gray-500">
                  {search.subreddits.map((sub) => `r/${sub}`).join(', ')}
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              Last run: {new Date(search.lastRun).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}