import React from 'react';
import { timelineItems } from '../data';

export const Timeline: React.FC = () => (
  <div id="timeline" className="mt-24 max-w-5xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
      What will you learn in 2 hours?
    </h2>
    
    <div className="relative">
      {/* Timeline line - Hidden on mobile, shown on md and up */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-orange-500"></div>
      
      {/* Mobile timeline line - Left aligned */}
      <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-orange-500"></div>
      
      <div className="space-y-8 md:space-y-12">
        {timelineItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-8 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Content - Full width on mobile, half width on desktop */}
            <div className="ml-16 md:ml-0 md:w-1/2 bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-2 md:p-3 bg-blue-50 rounded-lg">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">{item.title}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{item.description}</p>
                </div>
              </div>
            </div>
            
            {/* Timeline node - Repositioned for mobile */}
            <div className="absolute left-8 md:static md:flex-none md:w-8">
              <div className="absolute md:relative top-8 md:top-1/2 left-0 md:left-1/2 transform -translate-x-1/2 md:-translate-y-1/2">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white border-4 border-blue-500"></div>
              </div>
            </div>
            
            {/* Time slot - Hidden on mobile, visible on md and up */}
            <div className={`hidden md:block md:w-1/2 ${
              index % 2 === 0 ? 'text-right' : 'text-left'
            }`}>
              <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                {item.timeSlot}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-12 text-center">
      <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full font-semibold text-base md:text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200">
        Enroll Now
      </button>
    </div>
  </div>
);