import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Course Access</h2>
            <div className="space-y-4 text-gray-600">
              <p>By purchasing our Mutual Fund Mastery Workshop, you receive:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access to future updates</li>
                <li>Downloadable resources and tools</li>
                <li>Bonus materials as specified during purchase</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Intellectual Property</h2>
            <div className="space-y-4 text-gray-600">
              <p>All course materials, including but not limited to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Video content</li>
                <li>Written materials</li>
                <li>Worksheets and templates</li>
                <li>Bonus resources</li>
              </ul>
              <p>are protected by copyright and may not be shared, distributed, or resold.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Disclaimer</h2>
            <div className="space-y-4 text-gray-600">
              <p>The course content is for educational purposes only and does not constitute financial advice. We do not guarantee any specific returns or investment outcomes.</p>
              <p>Users should:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Conduct their own research</li>
                <li>Consult with financial advisors</li>
                <li>Make investment decisions based on their own judgment</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Conduct</h2>
            <p className="text-gray-600">
              Users agree not to share login credentials, reproduce course materials, or engage in any activity that violates these terms or applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Account Security</h2>
            <p className="text-gray-600">
              Users are responsible for maintaining the confidentiality of their account credentials and must notify us immediately of any unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Modifications</h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. Users will be notified of significant changes via email.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};