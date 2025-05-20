import React, {useEffect} from 'react';
import { ArrowLeft, Clock, Mail, Calendar, Video, FileCheck, Phone, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DeliveryPolicy() {

 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-8 transition duration-200">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </Link>
        
        {/* Main title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Delivery Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            How CashFlowCrew delivers our premium financial education workshops and what you can expect.
          </p>
        </div>
        
        {/* Main content card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          {/* Hero section */}
          <div className="bg-indigo-600 px-8 py-10 text-white">
            <h2 className="text-2xl font-bold mb-4">Digital Workshop Delivery</h2>
            <p className="text-lg opacity-90">
              CashFlowCrew provides digital educational workshops focused on financial literacy and wealth building. 
              Our delivery process ensures you receive timely access to all workshop materials and sessions.
            </p>
          </div>
          
          {/* Content sections */}
          <div className="p-8">
            {/* Delivery Process */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Delivery Process</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-xl p-6 flex gap-4 items-start">
                  <div className="bg-indigo-100 p-3 rounded-lg text-indigo-700">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Confirmation Timeline</h4>
                    <p className="text-gray-600">
                      Upon successful payment, you'll receive a confirmation email within 24 hours containing your purchase details and next steps.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 flex gap-4 items-start">
                  <div className="bg-indigo-100 p-3 rounded-lg text-indigo-700">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Access Information</h4>
                    <p className="text-gray-600">
                      Workshop access credentials, including login details for our learning platform, will be sent to your registered email address.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 flex gap-4 items-start">
                  <div className="bg-indigo-100 p-3 rounded-lg text-indigo-700">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Live Workshop Scheduling</h4>
                    <p className="text-gray-600">
                      For live workshops, you'll receive connection links and calendar invites at least 48 hours before the scheduled session.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 flex gap-4 items-start">
                  <div className="bg-indigo-100 p-3 rounded-lg text-indigo-700">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Workshop Recordings</h4>
                    <p className="text-gray-600">
                      All live workshop recordings will be available within 72 hours after the session and accessible through our learning platform for 12 months.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* What's Included */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included In Your Purchase</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-indigo-600 mt-1">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <p className="text-gray-700">
                    <span className="font-semibold">Workshop Sessions:</span> Access to all scheduled live online workshop sessions as detailed in your purchase.
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-indigo-600 mt-1">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <p className="text-gray-700">
                    <span className="font-semibold">Digital Resources:</span> Downloadable worksheets, templates, calculators, and reference materials to support your learning.
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-indigo-600 mt-1">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <p className="text-gray-700">
                    <span className="font-semibold">On-Demand Content:</span> Pre-recorded supplementary lessons and demonstrations available immediately upon purchase.
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-indigo-600 mt-1">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <p className="text-gray-700">
                    <span className="font-semibold">Community Access:</span> Invitation to our private community forum for peer learning and networking opportunities.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Important Notes */}
            <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
              <h3 className="text-xl font-bold text-amber-800 mb-4">Important Notes</h3>
              
              <div className="space-y-4 text-amber-800">
                <p>
                  <span className="font-semibold">Delivery Method:</span> All of our products are digital in nature. No physical items will be shipped.
                </p>
                
                <p>
                  <span className="font-semibold">Email Verification:</span> Please ensure the email address provided during checkout is correct and check your spam/junk folders if you don't receive our emails.
                </p>
                
                <p>
                  <span className="font-semibold">Technical Requirements:</span> Live workshops are conducted via Zoom. Please ensure your device meets the minimum technical requirements for participation.
                </p>
              </div>
            </section>
            
            {/* Technical Support */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Need Help With Access?</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-indigo-100 p-2 rounded-lg text-indigo-700">
                      <Phone className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold text-lg">Contact Support</h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Our support team is available Monday-Friday, 9am-5pm EST to assist with any delivery or access issues.
                  </p>
                  <a href="mailto:support@cashflowcrew.com" className="text-indigo-600 font-medium hover:text-indigo-800 transition">
                    support@cashflowcrew.com
                  </a>
                </div>
                
                
              </div>
            </section>
          </div>
        </div>
        
        {/* Footer CTA */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to start your financial education journey?</h3>
          <Link to="/workshops" className="inline-block bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-200">
            Browse Available Workshops
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DeliveryPolicy;