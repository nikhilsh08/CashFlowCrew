import React from 'react';
import { experiences } from '../data';

export const MentorSection: React.FC = () => (
  <div id="mentor" className="mt-24 relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-50">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h20v20H0z\' fill=\'%23000\' fill-opacity=\'.03\'/%3E%3C/svg%3E')] opacity-20"></div>
    <div className="relative max-w-6xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200">
          Meet your Mentor
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-48 h-48 md:w-64 md:h-64 relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 animate-pulse"></div>
          <img
            src="https://res.cloudinary.com/dq1llsy7f/image/upload/v1738855885/c1gzyxcgfokizkisio3j.jpg"
            alt="Nikhil Sharma"
            className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover object-[center_20%] rounded-full border-4 border-white"
          />
        </div>

        <div className="flex-1 text-left">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Nikhil Sharma</h2>
          <p className="text-orange-500 text-xl font-semibold mb-6">
            Amazon Ads SME | Founder – CashFlowCrew | Ex-Goldman Sachs
          </p>
          
          <p className="text-gray-600 text-lg mb-8 bg-white/80 p-6 rounded-xl backdrop-blur-sm">
            "Hey! I'm Nikhil Sharma, and I'm super passionate about empowering professionals and businesses to achieve growth and excellence across various domains."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {experiences.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 bg-white/90 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow backdrop-blur-sm">
                <Icon className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <div>
                  <h3 className="text-gray-900 font-semibold mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-600 text-lg italic bg-white/90 p-6 rounded-xl shadow-md backdrop-blur-sm">
            "As the founder of CashFlowCrew, my mission is to empower the average Indian with the knowledge and tools to achieve financial freedom. By simplifying complex financial concepts and teaching risk management strategies used by top investment banks, I help individuals and businesses unlock their full growth potential. Let's turn ambition into achievement!"
          </p>
        </div>
      </div>
    </div>
  </div>
);