import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginPrompt from './components/LoginPrompt';
import AuthCallback from './components/AuthCallback';
import { useRedditStore } from './store/reddit';

function App() {
  const { isAuthenticated } = useRedditStore();

  return (
    <Routes>
      <Route 
        path="/callback" 
        element={<AuthCallback />} 
      />
      <Route 
        path="/" 
        element={
          isAuthenticated ? <Dashboard /> : <LoginPrompt />
        } 
      />
      <Route 
        path="*" 
        element={<Navigate to="/" replace />} 
      />
    </Routes>
  );
}

export default App;