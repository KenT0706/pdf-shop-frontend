// src/components/Header.jsx
import React from 'react';
import { FileText, ShoppingCart } from 'lucide-react';

export function Header({ currentView, onViewChange, cartCount }) {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                HR Academy
              </h1>
              <p className="text-xs text-blue-200">Professional Training Resources</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-3">
            {['shop', 'admin'].map((view) => (
              <button
                key={view}
                onClick={() => onViewChange(view)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 capitalize relative overflow-hidden group ${
                  currentView === view 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/50' 
                    : 'text-blue-100 hover:text-white'
                }`}
              >
                <span className="relative z-10">{view}</span>
                {currentView !== view && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                )}
              </button>
            ))}
            
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