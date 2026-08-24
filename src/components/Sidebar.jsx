// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config';

const TOPICS = [
  'Employment Law & Industrial Relations Masterclass in HR & Termination Procedures',
  'Payroll Management Masterclass',
  'Applications of Employment Act, Sabah Labour Ordinance and Sarawak Labour Ordinance',
  'Developing HR Policies, SOPs and Employee Handbook',
  'Masterclass in Human Resource Management',
  'Critical HR Skills for Non-HR Managers',
  'Behavioral-based Interview',
  'Handling Discipline, Performance, Investigations and Domestic Inquiry',
  'Termination without Violating the Law',
  'HR & IR Documentations and Procedures',
  'Other specialized HR training programs'
];

export function Sidebar({ onFilterChange, onTopicClick }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState(100);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllTopics, setShowAllTopics] = useState(false);

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

  const displayedTopics = showAllTopics ? TOPICS : TOPICS.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Categories + Topics We Cover */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-bold text-lg text-slate-900 mb-4">Categories</h3>

        {loading ? (
          <div className="text-center text-slate-600 py-4">Loading...</div>
        ) : (
          <div className="space-y-2">
            {/* All Resources */}
            <button
              onClick={() => {
                setExpandedCategory(expandedCategory === 'all' ? null : 'all');
                onFilterChange({ category: null });
              }}
              className="w-full flex items-center justify-between p-3 rounded-lg text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group"
            >
              <span className="font-medium text-slate-700 group-hover:text-blue-600">All Resources</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 text-slate-600 group-hover:text-blue-600 ${expandedCategory === 'all' ? 'rotate-180' : ''}`} />
            </button>

            {/* Dynamic categories from API */}
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
                  <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-full group-hover:bg-blue-100">
                    {cat.count || 0}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 text-slate-600 group-hover:text-blue-600 ${expandedCategory === idx ? 'rotate-180' : ''}`} />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ========== Topics We Cover (moved here) ========== */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">
            Topics We Cover
          </h4>

          <ul className="space-y-1.5">
            {displayedTopics.map((topic) => (
              <li key={topic}>
                <button
                  onClick={() => onTopicClick?.(topic)}
                  className="w-full flex items-center justify-between gap-2 text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
                >
                  <span className="line-clamp-2">{topic}</span>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>
            ))}
          </ul>

          {TOPICS.length > 6 && (
            <button
              onClick={() => setShowAllTopics(!showAllTopics)}
              className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              {showAllTopics ? 'Show less' : `Show all ${TOPICS.length} topics`}
            </button>
          )}

          <p className="text-xs text-slate-500 mt-3">
            Click a topic to enquire — we’ll get back to you.
          </p>
        </div>
      </div>

      {/* Price Range (unchanged) */}
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