// src/components/AdminForm.jsx
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export function AdminForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    pdf_file: null,
    preview_image: null
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);

    try {
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('description', formData.description);
      formDataObj.append('price', formData.price);
      if (formData.pdf_file) formDataObj.append('pdf_file', formData.pdf_file);
      if (formData.preview_image) formDataObj.append('preview_image', formData.preview_image);

      await axios.post(`${API_URL}/products`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setFormData({ title: '', description: '', price: '', pdf_file: null, preview_image: null });
      alert('Product uploaded successfully! 🎉');
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading product');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl p-10 border border-slate-100">
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Upload New Product
          </h2>
          <p className="text-slate-600">Add a premium training resource to your catalog</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-start gap-3">
            <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Product Title</label>
            <input
              type="text"
              placeholder="e.g., Advanced Performance Management Framework"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition bg-slate-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Description</label>
            <textarea
              placeholder="Describe your product in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows="4"
              className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition bg-slate-50 focus:bg-white resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">Price (RM)</label>
              <div className="relative">
                <span className="absolute left-5 top-3.5 text-slate-600 font-semibold text-lg">RM</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="99.99"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="w-full pl-12 pr-5 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">Category</label>
              <select className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition bg-slate-50 focus:bg-white cursor-pointer">
                <option>Performance Management</option>
                <option>Employee Relations</option>
                <option>Recruitment</option>
                <option>Training & Development</option>
              </select>
            </div>
          </div>

          {/* PDF Upload */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">PDF File *</label>
            <label className="relative flex flex-col items-center justify-center px-6 py-10 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-300 rounded-2xl cursor-pointer hover:border-blue-500 transition-all duration-300 group">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-slate-700">
                  {formData.pdf_file ? formData.pdf_file.name : 'Click to upload PDF'}
                </p>
                <p className="text-sm text-slate-600 mt-1">Max 10MB</p>
              </div>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFormData({ ...formData, pdf_file: e.target.files[0] })}
                required
                className="hidden"
              />
            </label>
          </div>

          {/* Preview Image */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Preview Image (Optional)</label>
            <label className="relative flex flex-col items-center justify-center px-6 py-10 bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-slate-500 transition-all duration-300 group">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-slate-400 to-slate-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-slate-700">
                  {formData.preview_image ? formData.preview_image.name : 'Click to upload image'}
                </p>
                <p className="text-sm text-slate-600 mt-1">JPG, PNG (Max 2MB)</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, preview_image: e.target.files[0] })}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:from-slate-400 disabled:to-slate-400 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:scale-100"
          >
            <Upload className="w-6 h-6" />
            <span>{uploading ? 'Publishing...' : 'Publish Product'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}