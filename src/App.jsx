// src/App.jsx
import React, { useState, useEffect } from 'react';
import { X, CreditCard, Lock } from 'lucide-react';
import axios from 'axios';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Sidebar } from './components/Sidebar';
import { ProductCard } from './components/ProductCard';
import { AdminForm } from './components/AdminForm';
import { Footer } from './components/Footer';

const API_URL = 'http://127.0.0.1:8000/api';

function App() {
  const [currentView, setCurrentView] = useState('shop');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const [checkoutData, setCheckoutData] = useState({
    customer_name: '',
    customer_email: ''
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

  const handlePurchase = (product) => {
    setSelectedProduct(product);
    setCurrentView('checkout');
    setCartCount(cartCount + 1);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Purchase initiated!\n\n${selectedProduct.title}\nCustomer: ${checkoutData.customer_name}\nEmail: ${checkoutData.customer_email}\n\nPayment processing via Stripe...`);
    setCurrentView('shop');
    setCheckoutData({ customer_name: '', customer_email: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Header currentView={currentView} onViewChange={setCurrentView} cartCount={cartCount} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Shop View */}
        {currentView === 'shop' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <Hero />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="hidden lg:block">
                <div className="sticky top-28">
                  <Sidebar onFilterChange={(filter) => console.log(filter)} />
                </div>
              </div>

              {/* Products */}
              <div className="lg:col-span-3">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {products.map((product, idx) => (
                    <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                      <ProductCard 
                        product={product} 
                        onPurchase={handlePurchase}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin View */}
        {currentView === 'admin' && (
          <div className="animate-in fade-in duration-500 py-8">
            <AdminForm onSuccess={fetchProducts} />
          </div>
        )}

        {/* Checkout View */}
        {currentView === 'checkout' && selectedProduct && (
          <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
            <button
              onClick={() => setCurrentView('shop')}
              className="mb-8 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-all duration-300 hover:gap-3"
            >
              <X className="w-5 h-5" />
              <span className="font-semibold">Back to Shop</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-28 border border-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h3>
                  
                  <div className="mb-6 pb-6 border-b border-slate-200">
                    <h4 className="font-semibold text-slate-900 mb-2">{selectedProduct.title}</h4>
                    <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden mb-4">
                      {selectedProduct.preview_image ? (
                        <img
                          src={`http://127.0.0.1:8000/storage/${selectedProduct.preview_image}`}
                          alt={selectedProduct.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          📄
                        </div>
                      )}
                    </div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      RM{selectedProduct.price}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="font-semibold text-slate-900">RM{selectedProduct.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Tax</span>
                      <span className="font-semibold text-slate-900">RM0.00</span>
                    </div>
                    <div className="border-t border-slate-200 pt-3 flex justify-between">
                      <span className="font-bold text-slate-900">Total</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        RM{selectedProduct.price}
                      </span>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-800">
                    ✅ Instant delivery after payment
                  </div>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                  <h2 className="text-3xl font-bold text-slate-900 mb-8">Complete Your Order</h2>

                  <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-3">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={checkoutData.customer_name}
                        onChange={(e) => setCheckoutData({ ...checkoutData, customer_name: e.target.value })}
                        required
                        className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-3">Email Address</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={checkoutData.customer_email}
                        onChange={(e) => setCheckoutData({ ...checkoutData, customer_email: e.target.value })}
                        required
                        className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-5">
                      <p className="text-sm text-blue-900">
                        <span className="font-bold">ℹ️ Demo Mode:</span> In production, Stripe payment integration will be displayed here for secure card processing.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
                    >
                      <CreditCard className="w-6 h-6" />
                      <span>Complete Purchase</span>
                    </button>

                    <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
                      <Lock className="w-4 h-4" />
                      Your payment information is secure and encrypted
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;