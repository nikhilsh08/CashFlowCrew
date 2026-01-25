import React, { useState, useEffect } from 'react';
import { X, CheckCircle, FileText } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';


export const Popup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  // Trigger popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user has already seen/closed it in session storage if needed, 
      // but for this demo we just show it.
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email)
    if (!email) {
      toast.error("email not found")
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/email/newletter`, { email: email});
      // console.log("apply coupon res", res.data);
      if (res.data.success) {
        setIsSubmitted(true);
  
      }


    } catch (error: any) {
      toast.error(error?.response?.data?.message || "internal server error");
      // console.error("Error applying coupon", error);

    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 bg-gray-100 rounded-full hover:bg-gray-200 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative Top Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 to-yellow-500"></div>

        <div className="p-8">
          {!isSubmitted ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FileText className="w-8 h-8 text-orange-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
                Get 3 Free Investment Checklists
              </h2>
              <p className="text-gray-600 mb-8 text-sm">
                & Join CashFlowCrew to master your finances.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-gray-900 bg-white placeholder:text-gray-400"
                  />
                </div>
                <button type="submit"  className="text-base py-3 shadow-orange-200 w-full relative inline-flex items-center justify-center font-bold text-white uppercase tracking-wide transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg rounded-md overflow-hidden bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600" >
                  Send me the PDFs
                </button>
                <p className="text-[10px] text-center text-gray-400 mt-4">
                  Join 15,000+ investors. Unsubscribe at any time.
                </p>
              </form>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto animate-bounce">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Almost there!
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                We've sent a confirmation link to <span className="font-semibold text-slate-800">{email}</span>. Click it to unlock your downloads.
              </p>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="mt-8 text-sm text-blue-600 font-semibold hover:text-blue-700 underline underline-offset-2"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};