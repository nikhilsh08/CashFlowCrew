import React, { useState, useEffect } from 'react';
import { DollarSign, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-2.5 rounded-xl shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
                  CashFlowCrew
                </span>
                <span className="text-xs text-gray-500 hidden sm:block">
                  Master Your Finances
                </span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('mentor')} 
                className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('timeline')} 
                className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              >
                Course Details
              </button>
              <button className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                Enroll Now
              </button>
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-indigo-600 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              <button
                onClick={() => scrollToSection('mentor')}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('timeline')}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Course Details
              </button>
              <button className="block w-full px-4 py-2 mt-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all">
                Enroll Now
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="pt-32 md:pt-40">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Master Mutual Funds:{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
            Invest Smarter
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          EXPOSED: The Risk Analysis Secrets Wall Street Uses to Pick Mutual Funds 
          (That Your Financial Advisor Never Told You About)
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <div className="px-6 py-3 bg-red-50 rounded-xl border border-red-100">
            <p className="text-red-600 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Hurry! Only {minutes}:{seconds.toString().padStart(2, '0')} minutes left to enroll
            </p>
          </div>
        </div>
      </div>
    </>
  );
};