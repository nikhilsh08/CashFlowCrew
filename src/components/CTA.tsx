import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { masterclass } from "../data";

export const CTA: React.FC = () => {
  const navigate = useNavigate();
  const [showStrike, setShowStrike] = useState(false);
  const [showNewPrice, setShowNewPrice] = useState(false);
  
  const originalPrice = 999;
  
  useEffect(() => {
    // Start animation sequence
    const timer1 = setTimeout(() => setShowStrike(true), 500);
    const timer2 = setTimeout(() => setShowNewPrice(true), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="w-full lg:flex lg:justify-center">
      <div className="lg:w-1/2">
        <button
          onClick={() => navigate("/master-class/register")}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200"
        >
          <div className="flex mx-auto justify-center items-center space-y-1">
            <div className="flex items-center space-x-3">
              <span className="text-lg">Enroll Now for</span>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Original Price with Strike Animation */}
              <div className="relative">
                <span className={`text-xl transition-opacity duration-300 ${showStrike ? 'opacity-60' : ''}`}>
                  ₹{originalPrice}
                </span>
                {/* Animated strike line */}
                <div 
                  className={`absolute top-1/2 left-0 h-0.5 bg-red-500 transition-all duration-700 ${
                    showStrike ? 'w-full' : 'w-0'
                  }`}
                  style={{ transform: 'translateY(-50%)' }}
                />
              </div>
              
              {/* Arrow Animation */}
              <div className={`transition-all duration-500 ${showStrike ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* New Price with Scale Animation */}
              <div className={`transition-all duration-500 ${
                showNewPrice 
                  ? 'opacity-100 scale-110' 
                  : 'opacity-0 scale-75'
              }`}>
                <span className="text-2xl font-extrabold text-white">
                  ₹{masterclass.price}
                </span>
              </div>
            </div>
          </div>
        </button>
        <p className="mt-4 hidden text-gray-600">
          Use code{" "}
          <span className="font-mono font-bold  text-orange-600">
            MUTUALFUNDS100
          </span>{" "}
          on checkout
        </p>
      </div>
    </div>
  );
};