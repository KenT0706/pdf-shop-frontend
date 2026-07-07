// src/components/ProductCard.jsx
import React from 'react';
import { ShoppingCart, FileText, Star, Download } from 'lucide-react';

export function ProductCard({ product, onPurchase }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
    >
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

      <div className="bg-white h-full flex flex-col relative z-10">
        {/* Product Image/Preview */}
        <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
          {product.preview_image ? (
            <img
              src={`http://127.0.0.1:8000/storage/${product.preview_image}`}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-30 transition-all duration-500 ${isHovered ? 'scale-150' : 'scale-100'}`} />
                <FileText className="w-20 h-20 text-slate-400 relative" />
              </div>
            </div>
          )}
          
          {/* Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform transition-transform duration-300 group-hover:scale-110">
            NEW
          </div>

          {/* Overlay on hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end justify-center pb-4 animate-in fade-in duration-300">
              <div className="text-white text-center">
                <p className="text-sm font-semibold">Instant Download</p>
                <p className="text-xs text-blue-200">Get access immediately</p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
            {product.title}
          </h3>
          
          <p className="text-slate-600 text-sm leading-6 mb-4 flex-grow line-clamp-3">
            {product.description}
          </p>

          {/* Features */}
          <div className="space-y-2 mb-6 pb-4 border-b border-slate-200">
            <div className="flex items-center text-sm text-slate-600 gap-2 group/item">
              <FileText className="w-4 h-4 text-blue-600 group-hover/item:scale-125 transition-transform" />
              <span>PDF Resource</span>
            </div>
            <div className="flex items-center text-sm text-slate-600 gap-2 group/item">
              <Download className="w-4 h-4 text-green-600 group-hover/item:scale-125 transition-transform" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center text-sm text-slate-600 gap-2 group/item">
              <Star className="w-4 h-4 text-amber-500 group-hover/item:scale-125 transition-transform" />
              <span>Lifetime Access</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs text-slate-600 ml-2">(52 reviews)</span>
          </div>

          {/* Price and Button */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-200">
            <div>
              <p className="text-xs text-slate-600">Starting at</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RM{product.price}
              </p>
            </div>
            
            <button
              onClick={() => onPurchase(product)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-5 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Buy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}