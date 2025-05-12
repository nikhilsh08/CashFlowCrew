import React from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const RefundPolicy: React.FC = () => {
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

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7-Day Money-Back Guarantee
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We offer a 7-day, no-questions-asked money-back guarantee on our
                Mutual Fund Mastery Workshop.
              </p>

              <div className="bg-green-50 border border-green-100 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">
                      100% Money-Back Guarantee
                    </h3>
                    <p className="text-green-700">
                      If you're not satisfied with the course content within 7
                      days of purchase, we'll provide a full refund.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Refund Eligibility
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>To be eligible for a refund:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Request must be made within 7 days of purchase</li>
                <li>Course completion should not exceed 30%</li>
                <li>Bonus materials should not be downloaded</li>
                <li>Request must be submitted through official channels</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Refund Process
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>To request a refund:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  Email refunds@cashflowcrew.in with your purchase details
                </li>
                <li>
                  Include "Refund Request - [Your Name]" in the subject line
                </li>
                <li>Provide your order number and reason for refund</li>
                <li>Refunds are processed within 5-7 business days</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Non-Refundable Items
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>The following are not eligible for refund:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Course access after 7 days of purchase</li>
                <li>Downloaded bonus materials</li>
                <li>Special promotional offers marked as non-refundable</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600">
              For refund-related queries, contact us at:
              <br />
              Email: nikhil@blueflowercoshop.com
              <br />
              Response Time: Within 24 hours
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
