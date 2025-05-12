import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Information We Collect
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                When you enroll in our Mutual Fund Mastery Workshop, we collect:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Name and contact information</li>
                <li>Email address</li>
                <li>
                  Payment information (processed securely through our payment
                  partners)
                </li>
                <li>Course progress and completion data</li>
                <li>Communication preferences</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>We use your information to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide access to course materials</li>
                <li>Send important course updates and notifications</li>
                <li>Process payments and refunds</li>
                <li>Improve our course content and user experience</li>
                <li>Provide customer support</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Data Security
            </h2>
            <p className="text-gray-600">
              We implement industry-standard security measures to protect your
              personal information. All payment data is encrypted and processed
              through secure payment gateways.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Information Sharing
            </h2>
            <p className="text-gray-600">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information with service providers who
              assist us in operating our website and delivering our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Your Rights
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Contact Us
            </h2>
            <p className="text-gray-600">
              For privacy-related concerns, please contact us at:
              <br />
              Email: nikhil@blueflowercoshop.com
              <br />
              Address: 7 Bright Street, Flat 10AB, Kolkata - 700019
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
