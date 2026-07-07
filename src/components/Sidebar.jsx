// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function Sidebar({ onFilterChange }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState(100);

  const categories = [
    { name: 'All Resources', count: 24 },
    { name: 'Performance Management', count: 8 },
    { name: 'Employee Relations', count: 6 },
    { name: 'Recruitment', count: 5 },
    { name: 'Training & Development', count: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-bold text-lg text-slate-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setExpandedCategory(expandedCategory === idx ? null : idx)}
              className="w-full flex items-center justify-between p-3 rounded-lg text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group"
            >
              <span className="font-medium text-slate-700 group-hover:text-blue-600">{cat.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-full group-hover:bg-blue-100">{cat.count}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 text-slate-600 group-hover:text-blue-600 ${expandedCategory === idx ? 'rotate-180' : ''}`} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-bold text-lg text-slate-900 mb-4">Price Range</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">RM 0</span>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RM {priceRange}
            </span>
          </div>
          <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95">
            Apply Filter
          </button>
        </div>
      </div>

      {/* Ratings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-bold text-lg text-slate-900 mb-4">Ratings</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <input type="checkbox" className="w-5 h-5 rounded text-blue-600 cursor-pointer" />
              <div className="flex items-center gap-1">
                {[...Array(rating)].map((_, i) => (
                  <span key={i} className="text-amber-400">★</span>
                ))}
                {[...Array(5 - rating)].map((_, i) => (
                  <span key={i} className="text-slate-300">★</span>
                ))}
              </div>
              <span className="text-sm text-slate-600">& Up</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}