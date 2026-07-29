// src/components/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Eye, FileText, MoreVertical } from 'lucide-react';
import axios from 'axios';

import { API_URL, STORAGE_URL } from '../config';

const ADMIN_KEY = import.meta.env.VITE_ADMIN_API_KEY;

export function AdminPanel() {
  const [view, setView] = useState('upload'); // 'upload' or 'products'
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    pdf_file: null,
    preview_image: null
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('description', formData.description);
      formDataObj.append('price', formData.price);
      formDataObj.append('category', formData.category);
      if (formData.pdf_file) formDataObj.append('pdf_file', formData.pdf_file);
      if (formData.preview_image) formDataObj.append('preview_image', formData.preview_image);

      await axios.post(`${API_URL}/products`, formDataObj, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'X-Admin-Key': ADMIN_KEY
        }
      });

      setFormData({ title: '', description: '', price: '', category: '', pdf_file: null, preview_image: null });
      alert('✅ Product uploaded successfully!');
      fetchProducts();
      setView('products');
    } catch (err) {
      alert('❌ Error uploading product: ' + err.response?.data?.message);
    }
  };

  const handleDelete = async (productId, productTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${productTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeleting(productId);
      await axios.delete(`${API_URL}/products/${productId}`, {
        headers: { 'X-Admin-Key': ADMIN_KEY }
      });
      alert('✅ Product deleted successfully!');
      fetchProducts();
    } catch (err) {
      alert('❌ Error deleting product: ' + err.response?.data?.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setView('upload')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            view === 'upload'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300'
          }`}
        >
          <Upload className="w-5 h-5 inline mr-2" />
          Upload PDF
        </button>
        <button
          onClick={() => setView('products')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            view === 'products'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-300'
          }`}
        >
          <Eye className="w-5 h-5 inline mr-2" />
          My Products ({products.length})
        </button>
      </div>

      {/* Upload Form */}
      {view === 'upload' && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Upload New Product
          </h2>
          <p className="text-slate-600 mb-8">Add a premium training resource to your catalog</p>

          <form onSubmit={handleUploadSubmit} className="space-y-6">
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
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition bg-slate-50 focus:bg-white cursor-pointer"
                >
                  <option value="">Select a category</option>
                  <option value="Performance Management">Performance Management</option>
                  <option value="Employee Relations">Employee Relations</option>
                  <option value="Recruitment">Recruitment</option>
                  <option value="Training & Development">Training & Development</option>
                  <option value="Compensation & Benefits">Compensation & Benefits</option>
                  <option value="Labor Laws">Labor Laws</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>

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
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <Upload className="w-6 h-6" />
              <span>Publish Product</span>
            </button>
          </form>
        </div>
      )}

      {/* Products List */}
      {view === 'products' && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
            My Products
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-xl text-slate-600">No products uploaded yet</p>
              <p className="text-sm text-slate-500 mt-2">Upload your first PDF to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 flex-grow">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                      {product.preview_image ? (
                        <img
                          src={`${STORAGE_URL}/${product.preview_image}`}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FileText className="w-8 h-8 text-slate-400" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-grow">
                      <h3 className="font-bold text-slate-900 mb-1">{product.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-1">{product.description}</p>
                      <div className="flex gap-3 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {product.category || 'General'}
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          RM{product.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(product.id, product.title)}
                    disabled={deleting === product.id}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg transition-all duration-300 ml-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span className="hidden sm:inline text-sm font-semibold">
                      {deleting === product.id ? 'Deleting...' : 'Delete'}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}