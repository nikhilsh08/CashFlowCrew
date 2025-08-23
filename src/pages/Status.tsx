import axios from "axios";
import NavBar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { PhonePePaymentStatusResponse } from "../types";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { masterclass } from "../data";
import { toast } from "react-toastify";

// Declare fbq for TypeScript
declare global {
  interface Window {
    fbq: any;
  }
}

const Status = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [paymentStatus, setPaymentStatus] = useState<PhonePePaymentStatusResponse | null>(null);
  const [conversionFired, setConversionFired] = useState(false);

  // Helper function to get cookie
  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  // Fire Facebook Purchase event
  const fireFacebookPurchaseEvent = (paymentData: any) => {
    if (typeof window !== 'undefined' && window.fbq && !conversionFired) {
      // Get additional data for the event
      const amount = paymentData.data?.amount || 999; // Replace with actual amount
      const transactionId = paymentData.data?.transactionId || id;
      
      // Fire the Purchase event
      window.fbq('track', 'Purchase', {
        value: amount,
        currency: 'INR',
        content_ids: ['masterclass_enrollment'],
        content_type: 'product',
        content_name: 'Masterclass Enrollment'
      }, {
        eventID: transactionId // For deduplication
      });
      
      console.log('Facebook Purchase event fired:', {
        value: amount,
        currency: 'INR',
        transaction_id: transactionId
      });
      
      setConversionFired(true);
    }
  };

  const checkPaymentStatus = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/payments/status/${id}`
      );
      
      setPaymentStatus(response.data);
      // CRITICAL: Only fire Purchase event if payment was successful
      if (response.data.success && response.data.status === "COMPLETED") {
        
        // Fire Facebook Purchase event
        fireFacebookPurchaseEvent(response.data);
        
        // Update user record
        const update = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/users/update/${id}`,
          { paymentStatus: response.data, transaction: response.data.success, Value: response.data.data.amount,
            Currency: "INR"
           }
        );
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      toast.error("Error checking payment status");
    }
  };

  useEffect(() => {
    if (id && !conversionFired) {
      checkPaymentStatus();
    }
  }, [id]);

  // Rest of your existing code remains the same...
  const renderContent = () => {
    if (!paymentStatus) {
      return (
        <div className="text-center text-gray-600">
          Checking your payment status...
        </div>
      );
    }

    switch (paymentStatus.status) {
      case "COMPLETED":
        return (
          <>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 drop-shadow-md text-center flex items-center justify-center gap-2">
              <CheckCircle className="text-green-500 w-8 h-8" />
              Thank You for Enrolling!
            </h1>
            <p className="text-lg text-gray-800 mb-6 text-center drop-shadow-sm">
              Your enrollment was successful. We are excited to have you on board!
            </p>
            <div className="flex justify-center mt-6 items-center gap-x-4">
              <a
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                href={masterclass.meeting_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Webinar Link
              </a>
            </div>
          </>
        );

      case "PENDING":
        return (
          <>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 drop-shadow-md text-center flex items-center justify-center gap-2">
              <Clock className="text-yellow-500 w-8 h-8" />
              Payment is Processing
            </h1>
            <p className="text-lg text-gray-800 mb-6 text-center drop-shadow-sm">
              We are waiting for confirmation from your payment provider. Please refresh this page in a few minutes.
            </p>
            <div className="flex justify-center mt-6 items-center gap-x-4">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Go to Home Page
              </button>
            </div>
          </>
        );

      case "FAILED":
        return (
          <>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 drop-shadow-md text-center flex items-center justify-center gap-2">
              <XCircle className="text-red-500 w-8 h-8" />
              Payment Failed
            </h1>
            <p className="text-lg text-gray-800 mb-6 text-center drop-shadow-sm">
              Unfortunately, your payment did not go through. Please try again or contact support if the amount was deducted.
            </p>
            <div className="flex justify-center mt-6 items-center gap-x-4">
              <button
                onClick={() => navigate("/master-class/register")}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Go to Payment Page
              </button>
            </div>
          </>
        );

      default:
        return (
          <div className="text-center text-gray-600">
            Unknown payment status.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-100 relative">
      <NavBar />
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <div className="w-full max-w-3xl rounded-2xl bg-white/30 backdrop-blur-md p-8 shadow-2xl border border-white/20">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Status;
