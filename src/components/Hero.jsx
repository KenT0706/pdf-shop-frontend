// src/components/Hero.jsx
import React from 'react';
import { Zap, Lock, Truck, ArrowRight, ChevronRight } from 'lucide-react';

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

export function Hero({ onTopicClick }) {
  const styles = `
    @keyframes blob {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="mb-16 relative overflow-hidden rounded-3xl">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-8 py-16 md:py-20 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Topics List */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300 mb-4">
                Topics We Cover
              </h3>
              <ul className="space-y-2">
                {TOPICS.map((topic) => (
                  <li key={topic}>
                    <button
                      onClick={() => onTopicClick(topic)}
                      className="w-full flex items-center justify-between gap-2 text-left bg-white/5 hover:bg-white/15 border border-white/10 hover:border-cyan-400/50 rounded-lg px-4 py-2.5 text-sm text-blue-100 hover:text-white transition-all duration-300 group"
                    >
                      <span>{topic}</span>
                      <ChevronRight className="w-4 h-4 flex-shrink-0 text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </button>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-blue-200 mt-3">
                Click a topic to enquire — we'll get back to you.
              </p>
            </div>

            {/* Right: Main Hero Content */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Elevate Your
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  HR Expertise
                </span>
              </h2>

              <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-2xl">
                Access premium, professionally-curated training materials designed for modern HR professionals. Learn from industry experts and transform your career.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Instant Access</p>
                    <p className="text-xs text-blue-200">Download immediately</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">100% Secure</p>
                    <p className="text-xs text-blue-200">Safe payments</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">24/7 Support</p>
                    <p className="text-xs text-blue-200">We're here to help</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => document.getElementById('shop-products')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Explore Resources
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}