// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import axios from 'axios';

import { API_URL, STORAGE_URL } from '../config';

export function Sidebar({ onFilterChange }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState(100);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to load categories:', err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-bold text-lg text-slate-900 mb-4">Categories</h3>
        
        {loading ? (
          <div className="text-center text-slate-600 py-4">Loading...</div>
        ) : categories.length === 0 ? (
          <div className="text-center text-slate-600 py-4 text-sm">No categories yet</div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={() => setExpandedCategory(expandedCategory === 'all' ? null : 'all')}
              className="w-full flex items-center justify-between p-3 rounded-lg text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group"
            >
              <span className="font-medium text-slate-700 group-hover:text-blue-600">All Resources</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 text-slate-600 group-hover:text-blue-600 ${expandedCategory === 'all' ? 'rotate-180' : ''}`} />
            </button>

            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setExpandedCategory(expandedCategory === idx ? null : idx);
                  onFilterChange({ category: cat.name });
                }}
                className="w-full flex items-center justify-between p-3 rounded-lg text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group"
              >
                <span className="font-medium text-slate-700 group-hover:text-blue-600">{cat.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-full group-hover:bg-blue-100">{cat.count || 0}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 text-slate-600 group-hover:text-blue-600 ${expandedCategory === idx ? 'rotate-180' : ''}`} />
                </div>
              </button>
            ))}
          </div>
        )}
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
          <button 
            onClick={() => onFilterChange({ maxPrice: priceRange })}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}