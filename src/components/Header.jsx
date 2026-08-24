// src/components/Header.jsx
import React from 'react';
import { FileText, ShoppingCart, Lock } from 'lucide-react';

export function Header({ currentView, onViewChange, cartCount, isAdmin, onAdminClick }) {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => onViewChange('shop')}>
            <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                HR Training Consultancy
              </h1>
              <p className="text-xs text-blue-200">Professional Training Resources</p>
            </div>
          </div>

<div className="hidden md:flex items-center mx-6">
            <img
              src="/hr training photo.jpeg"          // ← path from public folder
              alt="HR Training Session"
              className="h-16 w-auto rounded-lg shadow-md object-cover border-2 border-cyan-400/30 hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* About Us - Centered */}
          <button
            onClick={() => onViewChange('about')}
            className={`hidden md:block px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group ${
              currentView === 'about'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'text-blue-100 hover:text-white'
            }`}
          >
            <span className="relative z-10">About Us</span>
            {currentView !== 'about' && (
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            )}
          </button>
          
          <nav className="flex items-center space-x-3">
            {/* Shop Button - Always visible */}
            <button
              onClick={() => onViewChange('shop')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 capitalize relative overflow-hidden group ${
                currentView === 'shop' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/50' 
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              <span className="relative z-10">Shop</span>
              {currentView !== 'shop' && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              )}
            </button>

            {/* Admin Button - Only visible if authenticated */}
            {isAdmin && (
              <button
                onClick={() => onViewChange('admin')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 capitalize relative overflow-hidden group ${
                  currentView === 'admin' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50' 
                    : 'text-blue-100 hover:text-white'
                }`}
              >
                <span className="relative z-10">Admin</span>
                {currentView !== 'admin' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                )}
              </button>
            )}

            {/* Admin Login Button - Only show if not admin */}
            {!isAdmin && (
              <button
                onClick={onAdminClick}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-blue-200 hover:text-white transition-all duration-300 hover:bg-blue-800/50"
                title="Developer access"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}
            
            {/* Shopping Cart */}
            {currentView === 'shop' && (
              <button className="relative ml-4 p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}