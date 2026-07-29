// src/components/Footer.jsx
import React from 'react';
import { FileText, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">HR Training Consultancy</h3>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Premium training resources for modern HR professionals worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'Blog', 'Support'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-blue-200 hover:text-cyan-400 transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'License', 'Cookies'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-blue-200 hover:text-cyan-400 transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-blue-200 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
                <Mail className="w-5 h-5" />
                <span>https://hr-training-consultancy.mystrikingly.com</span>
              </li>
              <li className="flex items-center gap-3 text-blue-200 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
                <Phone className="w-5 h-5" />
                <span>+60192371813</span>
              </li>
              <li className="flex items-center gap-3 text-blue-200 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
                <MapPin className="w-5 h-5" />
                <span>Kuala Lumpur, Malaysia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-200 text-sm">&copy; 2024 HR Academy. All rights reserved.</p>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-cyan-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}