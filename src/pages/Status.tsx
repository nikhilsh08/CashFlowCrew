// Status.tsx - Updated payment provider detection

import axios from "axios";
import NavBar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { masterclassConfig } from "../data";
import MovingLoader from "../components/Loader";
import { getFbcFromCookie, getFbcFromUrl, getFbpFromCookie } from "../lib/utils";

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
  const [paymentStatus, setPaymentStatus] = useState<any>(null);
  const [conversionFired, setConversionFired] = useState(false);
  const [shouldWarnBeforeLeave, setShouldWarnBeforeLeave] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [loading, setLoading] = useState(true);
  const fbc = getFbcFromCookie() || getFbcFromUrl();
  const fbp = getFbpFromCookie();

  const [paymentProvider, setPaymentProvider] = useState<"Phonepe" | "SabPaisa" | "Zwitch" | null>(null);

  // ✅ Determine payment provider based on order ID prefix
  useEffect(() => {
    if (!id) return;
    
    const upperCaseId = id.toUpperCase();
    
    if (upperCaseId.startsWith("ORDER_PP")) {
      setPaymentProvider("Phonepe");
      console.log("✅ Detected PhonePe payment");
    } else if (upperCaseId.startsWith("ORDER_SP")) {
      setPaymentProvider("SabPaisa");
      console.log("✅ Detected SabPaisa payment");
    } else if (upperCaseId.startsWith("ORDER_ZW")) {
      setPaymentProvider("Zwitch");
      console.log("✅ Detected Zwitch payment");
    } else {
      // Default to PhonePe if prefix not recognized
      setPaymentProvider("Phonepe");
      console.log("⚠️ Unknown prefix, defaulting to PhonePe");
    }
  }, [id]);

  const firePurchaseEvents = (paymentData: any) => {
    if (conversionFired) return;

    const rawAmount = paymentData.amount || paymentData.data?.amount || 999;
    const amount = paymentProvider === "Phonepe" ? rawAmount / 100 : rawAmount;
    const transactionId = id;

    console.log("🔥 Firing purchase events:", { amount, provider: paymentProvider });

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
          eventID: transactionId,
        }
      );
    }

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

  // PhonePe payment status
  const phonePePaymentStatus = async () => {
    try {
      console.log("📞 Checking PhonePe payment status for:", id);
      
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/payments/status`,
        { orderId: id, fbp, fbc },
        {
          headers: {
            "Content-Type": "application/json",
            "User-Agent": navigator.userAgent,
          },
        }
      );

      setPaymentStatus(response.data);

      if (response.data.success && response.data.status === "COMPLETED") {
        firePurchaseEvents(response.data);
      }

      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/users/update/${id}`,
        {
          paymentStatus: response.data,
          transaction: response.data.success,
          Value: response.data.data?.amount || 0,
          Currency: "INR",
          transactionStatus: response.data.status,
        }
      );
    } catch (error) {
      console.error("❌ Error checking PhonePe payment status:", error);
    } finally {
      setLoading(false);
    }
  };

  // SabPaisa payment status
  const sabPaisaPaymentStatus = async () => {
    try {
      console.log("💳 Checking SabPaisa payment status for:", id);
      
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/payments/status-sp-v1`,
        { orderId: id },
        {
          headers: {
            "Content-Type": "application/json",
            "User-Agent": navigator.userAgent,
          },
        }
      );

      const transformedResponse = {
        success: response.data.success,
        status: mapSabPaisaStatus(response.data.data?.status),
        data: {
          ...response.data.data,
          amount: parseFloat(response.data.data?.amount || response.data.data?.paidAmount || "0") * 100,
        },
        message: response.data.data?.sabpaisaMessage
      };

      setPaymentStatus(transformedResponse);

      if (response.data.success && transformedResponse.status === "COMPLETED") {
        firePurchaseEvents(transformedResponse);
      }

      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/users/update/${id}`,
        {
          paymentStatus: transformedResponse,
          transaction: response.data.success,
          Value: parseFloat(response.data.data?.paidAmount || response.data.data?.amount || "0"),
          Currency: "INR",
          transactionStatus: transformedResponse.status,
        }
      );
    } catch (error) {
      console.error("❌ Error checking SabPaisa payment status:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Zwitch payment status
  const zwitchPaymentStatus = async () => {
    try {
      console.log("🔷 Checking Zwitch payment status for:", id);
      
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/payments/status-zw-v1`,
        { orderId: id },
        {
          headers: {
            "Content-Type": "application/json",
            "User-Agent": navigator.userAgent,
          },
        }
      );

      console.log("Zwitch response:", response.data);

      // ✅ Handle both amount formats (paise or rupees)
      const amountValue = response.data.user?.Value 
        ? response.data.user.Value / 100  // Convert from paise
        : parseFloat(response.data.user?.amount || "0");

      const transformedResponse = {
        success: response.data.success,
        status: mapZwitchStatus(response.data.status || response.data.user?.transactionStatus || "PENDING"),
        data: {
          amount: amountValue,
          paidAmount: amountValue,
          orderId: response.data.orderId,
          ...response.data.user
        },
        message: response.data.message || "Payment status check completed"
      };

      setPaymentStatus(transformedResponse);

      if (response.data.success && transformedResponse.status === "COMPLETED") {
        firePurchaseEvents(transformedResponse);
      }

      // Update user record
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/users/update/${id}`,
        {
          paymentStatus: transformedResponse,
          transaction: transformedResponse.status === "COMPLETED",
          Value: response.data.user?.Value || Math.round(amountValue * 100), // Store in paise
          Currency: "INR",
          transactionStatus: transformedResponse.status,
        }
      );
    } catch (error: any) {
      console.error("❌ Error checking Zwitch payment status:", error);
      
      setPaymentStatus({
        success: false,
        status: "FAILED",
        data: {},
        message: error.response?.data?.message || "Failed to check payment status. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  // Map SabPaisa status
  const mapSabPaisaStatus = (sabpaisaStatus: string): string => {
    const statusMap: { [key: string]: string } = {
      'SUCCESS': 'COMPLETED',
      'FAILED': 'FAILED',
      'ABORTED': 'FAILED',
      'PENDING': 'PENDING',
      'INITIATED': 'PENDING',
    };
    
    return statusMap[sabpaisaStatus] || sabpaisaStatus;
  };

  // ✅ Map Zwitch status
  const mapZwitchStatus = (zwitchStatus: string): string => {
    const statusMap: { [key: string]: string } = {
      'COMPLETED': 'COMPLETED',
      'paid': 'COMPLETED',
      'captured': 'COMPLETED',
      'PENDING': 'PENDING',
      'pending': 'PENDING',
      'created': 'PENDING',
      'authorized': 'PENDING',
      'FAILED': 'FAILED',
      'failed': 'FAILED',
      'cancelled': 'FAILED',
      'ERROR': 'FAILED',
    };
    
    return statusMap[zwitchStatus] || zwitchStatus;
  };

  // // ✅ Check payment status based on provider
  // const checkPaymentStatus = async () => {
  //   setLoading(true);
  //   console.log("🔍 Checking payment status for provider:", paymentProvider);
    
  //   if (paymentProvider === "Phonepe") {
  //     await phonePePaymentStatus();
  //   } else if (paymentProvider === "SabPaisa") {
  //     await sabPaisaPaymentStatus();
  //   } else if (paymentProvider === "Zwitch") {
  //     await zwitchPaymentStatus();
  //   } else {
  //     // Default to PhonePe
  //     await phonePePaymentStatus();
  //   }
  // };

  // ✅ Get payment amount based on provider
  const getPaymentAmount = () => {
    if (!paymentStatus) return 0;
    
    if (paymentProvider === "Phonepe") {
      return paymentStatus?.data?.amount / 100;
    } else if (paymentProvider === "SabPaisa") {
      return parseFloat(paymentStatus?.data?.paidAmount || paymentStatus?.data?.amount || "0");
    } else if (paymentProvider === "Zwitch") {
      // Amount is already in rupees from transformation
      return parseFloat(paymentStatus?.data?.amount || paymentStatus?.data?.paidAmount || "0");
    }
    return 0;
  }; (zwitchStatus: string): string => {
    const statusMap: { [key: string]: string } = {
      'COMPLETED': 'COMPLETED',
      'paid': 'COMPLETED',
      'captured': 'COMPLETED',
      'PENDING': 'PENDING',
      'pending': 'PENDING',
      'created': 'PENDING',
      'authorized': 'PENDING',
      'FAILED': 'FAILED',
      'failed': 'FAILED',
      'cancelled': 'FAILED',
      'ERROR': 'FAILED',
    };
    
    return statusMap[zwitchStatus] || zwitchStatus;
  };

  // ✅ Check payment status based on provider
  const checkPaymentStatus = async () => {
    setLoading(true);
    console.log("🔍 Checking payment status for provider:", paymentProvider);
    
    if (paymentProvider === "Phonepe") {
      await phonePePaymentStatus();
    } else if (paymentProvider === "SabPaisa") {
      await sabPaisaPaymentStatus();
    } else if (paymentProvider === "Zwitch" || paymentProvider === "Layer") {
      await zwitchPaymentStatus();
    } else {
      // Default to PhonePe
      await phonePePaymentStatus();
    }
  };

  // ✅ Get payment amount based on provider
  // const getPaymentAmount = () => {
  //   if (!paymentStatus) return 0;
    
  //   if (paymentProvider === "Phonepe") {
  //     return paymentStatus?.data?.amount / 100;
  //   } else if (paymentProvider === "SabPaisa") {
  //     return parseFloat(paymentStatus?.data?.paidAmount || paymentStatus?.data?.amount || "0");
  //   } else if (paymentProvider === "Zwitch" || paymentProvider === "Layer") {
  //     // Amount is already in rupees from transformation
  //     return parseFloat(paymentStatus?.data?.amount || paymentStatus?.data?.paidAmount || "0");
  //   }
  //   return 0;
  // };

  // Auto redirect for successful payments
  useEffect(() => {
    if (paymentStatus?.status === "COMPLETED" && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (paymentStatus?.status === "COMPLETED" && redirectCountdown === 0) {
      const amount = getPaymentAmount();
      if (amount >= 999) return;
      window.location.href = masterclass.meeting_link;
    }
  }, [paymentStatus?.status, redirectCountdown, masterclass.meeting_link]);
  
  useEffect(() => {
    if (paymentStatus) {
      const shouldWarn = paymentStatus.status === "PENDING" || 
                        (paymentStatus.status === "COMPLETED" && redirectCountdown > 0);
      setShouldWarnBeforeLeave(shouldWarn);
    } else {
      setShouldWarnBeforeLeave(true);
    }
  }, [paymentStatus, redirectCountdown]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (shouldWarnBeforeLeave) {
        const message = "Your payment is being processed. Are you sure you want to leave?";
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    if (shouldWarnBeforeLeave) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [shouldWarnBeforeLeave]);

  useEffect(() => {
    if (id && !conversionFired && paymentProvider) {
      console.log("🚀 Initiating status check for:", { id, provider: paymentProvider });
      checkPaymentStatus();
    }
  }, [id, paymentProvider]);

  const renderContent = () => {
    if (loading || !paymentStatus) {
      return (
        <MovingLoader 
          size={240} 
          animationType="bounce" 
          speed={1.2} 
          className="!bg-none !border-none" 
          text="Please wait for the payment confirmation..." 
        />
      );
    }

    const paymentAmount = getPaymentAmount();

    switch (paymentStatus.status) {
      case "COMPLETED":
        return (
          <>
            {paymentAmount >= 999 ? (
              <>
                <h1 className="text-4xl font-bold text-gray-900 mb-4 drop-shadow-md text-center flex items-center justify-center gap-2">
                  <CheckCircle className="text-green-500 w-8 h-8" />
                  Thank You for Enrolling!
                </h1>
                <p className="text-lg text-gray-800 mb-6 text-center drop-shadow-sm">
                  Your enrollment was successful. We are excited to have you on board!
                </p>
                <div className="flex justify-center mt-6 items-center gap-x-4">
                  <p className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all">
                    We'll share you the webinar link via email shortly.
                  </p>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold text-gray-900 mb-4 drop-shadow-md text-center flex items-center justify-center gap-2">
                  <CheckCircle className="text-green-500 w-8 h-8" />
                  Thank You for Enrolling!
                </h1>
                <p className="text-lg text-gray-800 mb-6 text-center drop-shadow-sm">
                  Your enrollment was successful. We are excited to have you on board!
                </p>

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
            )}
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
            {paymentStatus.message && (
              <p className="text-sm text-gray-600 mb-4 text-center">
                {paymentStatus.message}
              </p>
            )}
            <div className="flex justify-center mt-6 items-center gap-x-4">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Go to Home Page
              </button>
              <button
                onClick={checkPaymentStatus}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Check Status Again
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
            {paymentStatus.message && (
              <p className="text-sm text-red-600 mb-4 text-center">
                Reason: {paymentStatus.message}
              </p>
            )}
            <div className="flex justify-center mt-6 items-center gap-x-4">
              <button
                onClick={() => navigate("/master-class/register")}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Try Payment Again
              </button>
            </div>
          </>
        );

      default:
        return (
          <div className="text-center text-gray-600">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 drop-shadow-md text-center">
              Unknown Payment Status
            </h1>
            <p className="text-lg text-gray-800 mb-6 text-center drop-shadow-sm">
              We couldn't determine your payment status. Please contact support.
            </p>
            <div className="flex justify-center mt-6 items-center gap-x-4">
              <button
                onClick={checkPaymentStatus}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Check Status Again
              </button>
            </div>
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
          {paymentProvider && (
            <div className="text-center mb-4">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {paymentProvider} Payment
              </span>
            </div>
          )}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Status;