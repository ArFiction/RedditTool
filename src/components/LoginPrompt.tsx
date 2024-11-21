import React from 'react';
import { LogIn } from 'lucide-react';
import { useRedditStore } from '../store/reddit';

export default function LoginPrompt() {
  const { login } = useRedditStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mb-6">
          <LogIn className="h-12 w-12 text-indigo-600 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to RedditLens</h2>
        <p className="text-gray-600 mb-8">
          Sign in with your Reddit account to start exploring insights and trends.
        </p>
        <button
          onClick={login}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in with Reddit
        </button>
      </div>
    </div>
  );
}