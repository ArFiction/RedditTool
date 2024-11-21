import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRedditStore } from '../store/reddit';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleAuthCallback, error } = useRedditStore();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code && state) {
      console.log('Received auth code:', code);
      handleAuthCallback(code, state)
        .then(() => {
          console.log('Auth successful, redirecting...');
          navigate('/', { replace: true });
        })
        .catch((error) => {
          console.error('Auth error:', error);
        });
    } else {
      console.error('Missing code or state in URL parameters');
    }
  }, [searchParams, handleAuthCallback, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-red-600 text-xl font-semibold mb-2">Authentication Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl flex items-center space-x-4">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
        <span className="text-gray-600">Completing authentication...</span>
      </div>
    </div>
  );
}