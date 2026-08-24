// src/App.jsx
import React, { useState, useEffect } from 'react';
import { X, CreditCard, Lock } from 'lucide-react';
import axios from 'axios';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Sidebar } from './components/Sidebar';
import { ProductCard } from './components/ProductCard';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanel } from './components/AdminPanel';
import { InterestForm } from './components/InterestForm';
import { About } from './components/About';

import { API_URL, STORAGE_URL } from './config';

function App() {
  const [currentView, setCurrentView] = useState('shop');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const [checkoutData, setCheckoutData] = useState({
    customer_name: '',
    customer_email: ''
  });

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
    fetchProducts();
  }, []);

  const handleAdminLoginClick = () => {
    setShowAdminLogin(true);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdmin(true);
    setCurrentView('shop');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    setCurrentView('shop');
  };

  const handleTopicClick = (topicName) => {
    setSelectedProduct({ id: null, title: topicName, price: null });
    setCurrentView('checkout');
  };

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

  const handlePurchase = (product) => {
    setSelectedProduct(product);
    setCurrentView('checkout');
    setCartCount(cartCount + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        cartCount={cartCount}
        isAdmin={isAdmin}
        onAdminClick={handleAdminLoginClick}
      />

      <AdminLogin
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Shop View */}
        {currentView === 'shop' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            
            {/* ========== NEW LAYOUT: Sidebar LEFT + Hero RIGHT ========== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              
              {/* Left column - Sidebar (Categories + Topics) */}
              <div className="lg:col-span-4 xl:col-span-3 order-2 lg:order-1">
                <div className="sticky top-28">
                  <Sidebar 
                    onFilterChange={(filter) => console.log(filter)} 
                    onTopicClick={handleTopicClick}
                  />
                </div>
              </div>

              {/* Right column - Blue Hero box */}
              <div className="lg:col-span-8 xl:col-span-9 order-1 lg:order-2">
                <Hero />
              </div>
            </div>
            {/* ======================================================== */}

            {/* Products section (full width below) */}
            <div id="shop-products">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-slate-900 mb-2">Featured Resources</h3>
                <p className="text-slate-600 mb-6">Curated training materials for modern HR professionals</p>
              </div>

              {loading && (
                <div className="flex justify-center items-center py-20">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-30 animate-ping"></div>
                    <div className="absolute inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-50 animate-spin"></div>
                    <div className="absolute inset-4 bg-white rounded-full"></div>
                  </div>
                </div>
              )}

              {products.length === 0 && !loading && (
                <div className="text-center py-20">
                  <p className="text-xl text-slate-600">No products available yet</p>
                  <p className="text-sm text-slate-500 mt-2">Check back soon!</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, idx) => (
                  <div 
                    key={product.id} 
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500" 
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <ProductCard 
                      product={product} 
                      onPurchase={handlePurchase}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* About View */}
        {currentView === 'about' && (
          <div className="animate-in fade-in duration-500 py-8">
            <About />
          </div>
        )}

        {/* Admin View */}
        {currentView === 'admin' && (
          <div className="animate-in fade-in duration-500 py-8">
            <AdminPanel />
          </div>
        )}

        {/* Checkout / Interest Form View */}
        {currentView === 'checkout' && selectedProduct && (
          <InterestForm
            product={selectedProduct}
            onClose={() => setCurrentView('shop')}
            onSuccess={() => {
              setSelectedProduct(null);
              setCheckoutData({ customer_name: '', customer_email: '' });
            }}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;