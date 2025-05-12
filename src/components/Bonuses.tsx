import React from 'react';
import { FileText, BarChart2, TrendingUp, BookOpen, PenTool as Tool, Bot } from 'lucide-react';
import { bonuses } from '../data';

export const Bonuses: React.FC = () => (
  <div className="mt-24 py-16 bg-gradient-to-b from-gray-50 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Register before midnight of January 22, 2025 to
        </h2>
        <p className="text-2xl md:text-3xl font-bold">
          Unlock Bonuses worth{' '}
          <span className="text-orange-500">₹8,999+ for FREE!</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bonuses.map((bonus, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="bg-gray-900 p-8 flex justify-center items-center">
              <bonus.icon className="w-12 h-12 text-orange-500" />
            </div>
            <div className="p-6">
              <div className="text-sm text-blue-600 font-semibold mb-2">
                Bonus {index + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {bonus.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {bonus.description}
              </p>
              <div className="text-lg font-bold text-orange-500">
                Worth ₹{bonus.worth}/-
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200">
          Claim Your Bonuses Now
        </button>
      </div>
    </div>
  </div>
);