import React from 'react';
import { EventDetail } from '@/types';
import { eventDetails } from '@/data';
import { CTA } from './CTA';

export const EventDetails: React.FC = () => (
  <div className="bg-white flex flex-col rounded-2xl shadow-lg w-[98.5%] p-8 gap-8">
    {/* Instructor Details Section */}
    <div className=''>
      <h2 className="text-2xl font-bold text-[#2A4759] mb-4">
        Meet Your Instructor
      </h2>
      <div>
        <h3 className="text-xl font-bold text-gray-900">Nikhil Sharma</h3>
        <p className="text-md text-gray-600 mb-4">Co-Founder, CashFlowCrew</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Managed Risk for ₹65B+ AUM at Goldman Sachs</li>
          <li>2-Time Founder: LitmusEye & CashFlowCrew</li>
          <li>Ex National Head of Operations & Enterprise Sales at LocoNav</li>
        </ul>
      </div>
    </div>

    {/* Event Details Grid */}
    <div className="grid grid-cols-2 gap-6">
      {eventDetails.map(({ icon: Icon, text }) => (
        <div
          key={text}
          className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-[#DDDDDD]"
        >
          <Icon className="w-6 h-6 text-[#2A4759] mb-2" />
          <span className="text-gray-800 font-medium">{text}</span>
        </div>
      ))}
    </div>

    {/* Call to Action Button */}
    <CTA className="w-full" />
  </div>
);