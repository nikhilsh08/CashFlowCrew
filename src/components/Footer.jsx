import React from 'react';
import { DollarSign, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-2 rounded-xl shadow-lg">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
                CashFlowCrew
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Empowering individuals with professional-grade mutual fund investment knowledge and strategies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('mentor')}
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Meet Your Mentor
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('timeline')}
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Course Details
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('faq')}
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-indigo-600 mt-0.5" />
                <a href="mailto:support@cashflowcrew.com" className="text-gray-600 hover:text-indigo-600 transition-colors">
                nikhil@blueflowercoshop.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-600 mt-0.5" />
                <address className="text-gray-600 not-italic">
                  7 Bright Street,<br />
                  Flat 10AB,<br />
                  Kolkata - 700019
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm text-center md:text-left">
              © {currentYear} CashFlowCrew. All rights reserved. | CIN: U74999HR2023PTC123456
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy-policy#cookies" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm">
                Cookie Policy
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/sitemap" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};