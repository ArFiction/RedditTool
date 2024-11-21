import React, { useState } from 'react';
import { Search, BookMarked, TrendingUp, Save } from 'lucide-react';
import SearchPanel from './SearchPanel';
import ResultsPanel from './ResultsPanel';
import SavedSearches from './SavedSearches';
import { useRedditStore } from '../store/reddit';

export default function Dashboard() {
  const { results } = useRedditStore();
  const [activeTab, setActiveTab] = useState('search');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookMarked className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">RedditLens</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('search')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'search'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Search className="h-4 w-4 inline mr-2" />
                Search
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'saved'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Save className="h-4 w-4 inline mr-2" />
                Saved
              </button>
              <button
                onClick={() => setActiveTab('trends')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'trends'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <TrendingUp className="h-4 w-4 inline mr-2" />
                Trends
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            {activeTab === 'search' && <SearchPanel />}
            {activeTab === 'saved' && <SavedSearches />}
            {activeTab === 'trends' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Trending Topics</h2>
                <p className="text-gray-600">Coming soon...</p>
              </div>
            )}
          </div>
          <div className="lg:col-span-2">
            <ResultsPanel results={results} />
          </div>
        </div>
      </main>
    </div>
  );
}