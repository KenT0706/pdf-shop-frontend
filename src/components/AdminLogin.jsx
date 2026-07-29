// src/components/AdminLogin.jsx
import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

export function AdminLogin({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ADMIN_PASSWORD = '668866'; 

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate loading
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('isAdmin', 'true');
        onSuccess();
        setPassword('');
        onClose();
      } else {
        setError('Invalid password');
      }
      setLoading(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in scale-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-full">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
          Developer Access
        </h2>
        <p className="text-slate-600 text-center text-sm mb-6">
          Enter the admin password to access the admin panel
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoFocus
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition bg-slate-50 focus:bg-white disabled:opacity-50"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-400 disabled:to-slate-400 text-white py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:scale-100"
          >
            {loading ? 'Verifying...' : 'Login'}
          </button>
        </form>

       
      </div>
    </div>
  );
}