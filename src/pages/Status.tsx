import axios from "axios";
import NavBar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { PhonePePaymentStatusResponse } from "../types";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { masterclassConfig } from "../data";
import { toast } from "react-toastify";

// Declare fbq and gtag for TypeScript
declare global {
  interface Window {
    fbq: any;
    gtag: any;
  }
}

const Status = () => {
  const masterclass = masterclassConfig()[1];
  const navigate = useNavigate();
  const { id } = useParams();
  const [paymentStatus, setPaymentStatus] = useState<PhonePePaymentStatusResponse | null>(null);
  const [conversionFired, setConversionFired] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5); // 5 second countdown

  // 🔥 Fire Facebook + GA4 purchase events
  const firePurchaseEvents = (paymentData: any) => {
    if (conversionFired) return; // prevent duplicates

    const rawAmount = paymentData.data?.amount || 999;
    const amount = rawAmount / 100; // PhonePe returns paise, convert to INR
    const transactionId = paymentData.data?.transactionId || id;

    // --- Facebook Pixel Purchase ---
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq(
        "track",
        "Purchase",
        {
          value: amount,
          currency: "INR",
          content_ids: ["masterclass_enrollment"],
          content_type: "product",
          content_name: "Masterclass Enrollment",
        },
        {
          eventID: transactionId, // deduplication
        }
      );
    }

    // --- Google Analytics 4 Purchase ---
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "purchase", {
        transaction_id: transactionId,
        affiliation: "CashFlowCrew",
        value: amount,
        currency: "INR",
        items: [
          {
            item_name: "Masterclass Enrollment",
            item_id: "masterclass_enrollment",
            price: amount,
            quantity: 1,
          },
        ],
      });
    }

    setConversionFired(true);
  };

  // ✅ Check payment status from backend
  const checkPaymentStatus = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/payments/status/${id}`
      );

      setPaymentStatus(response.data);

      // Only fire events + update if payment completed
      if (response.data.success && response.data.status === "COMPLETED") {
        firePurchaseEvents(response.data);

        // Update user record in backend
        await axios.put(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/users/update/${id}`,
          {
            paymentStatus: response.data,
            transaction: response.data.success,
            Value: response.data.data.amount,
            Currency: "INR",
          }
        );
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      toast.error("Error checking payment status");
    }
  };

  // Auto redirect effect for successful payments
  useEffect(() => {
    if (paymentStatus?.status === "COMPLETED" && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (paymentStatus?.status === "COMPLETED" && redirectCountdown === 0) {
      // Redirect to meeting link
      window.open(masterclass.meeting_link, "_blank");
    }
  }, [paymentStatus?.status, redirectCountdown, masterclass.meeting_link]);

  useEffect(() => {
    if (id && !conversionFired) {
      checkPaymentStatus();
    }
  }, [id]);

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

            {/* Countdown display */}
            <div className="text-center mb-6">
              <p className="text-md text-gray-600 mb-2">
                Redirecting to webinar in {redirectCountdown} seconds...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((5 - redirectCountdown) / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-center mt-6 items-center gap-x-4">
              <a
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                href={masterclass.meeting_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Webinar Link Now
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
              We are waiting for confirmation from your payment provider. Please
              refresh this page in a few minutes.
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
              Unfortunately, your payment did not go through. Please try again
              or contact support if the amount was deducted.
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
          <div className="text-center text-gray-600">Unknown payment status.</div>
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
