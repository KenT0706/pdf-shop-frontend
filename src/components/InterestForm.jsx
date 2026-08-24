// src/components/InterestForm.jsx
import React, { useState } from 'react';
import { Mail, Phone, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';

import { API_URL, STORAGE_URL } from '../config';

export function InterestForm({ product, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
     await axios.post(`${API_URL}/send-interest-email`, {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  product_id: product.id ?? null,
  product_title: product.title,
  product_price: product.price ?? null,
});

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to send request. Please try again.';
      setError(errorMsg);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in scale-in duration-300 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-full animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Sent!</h2>
          <p className="text-slate-600 mb-4">
            Thank you for your interest! Our team will contact you shortly at <span className="font-semibold">{formData.phone}</span> to arrange the purchase.
          </p>
          <p className="text-sm text-slate-500">
            Make sure to check your email at <span className="font-semibold">{formData.email}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-in scale-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          ✕
        </button>

        {/* Product Info */}
        <div className="mb-6 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-600">You're interested in:</p>
              <h3 className="font-bold text-slate-900 line-clamp-1">{product.title}</h3>
            </div>
          </div>
        {product.price != null && (
  <p className="text-2xl font-bold text-blue-600">RM{product.price}</p>
)}
        </div>

        {/* Form Title */}
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Express Your Interest</h2>
        <p className="text-slate-600 text-sm mb-6">
          Our team will contact you to finalize your purchase.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={loading}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition bg-slate-50 focus:bg-white disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition bg-slate-50 focus:bg-white disabled:opacity-50"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="tel"
                placeholder="+60 12 345 6789"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition bg-slate-50 focus:bg-white disabled:opacity-50"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:from-slate-400 disabled:to-slate-400 text-white py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:scale-100"
          >
            {loading ? 'Sending...' : 'Express Interest'}
          </button>

          {/* Info */}
          <p className="text-xs text-slate-500 text-center">
            Our team will contact you within 24 hours
          </p>
        </form>
      </div>
    </div>
  );
}