import axios from "axios";
import NavBar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { PhonePePaymentStatusResponse } from "../types";
import { CheckCircle, Clock, XCircle } from "lucide-react";


const Status = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const [paymentStatus, setPaymentStatus] = useState<PhonePePaymentStatusResponse | null>(null);

  const checkPaymentStatus = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/payments/status/${id}`
      );
      setPaymentStatus(response.data);
      if (response.data.success) {
        const update = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/users/update/${id}`,
          { paymentStatus, transaction: response.data.success }
        );
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
    }
  };
  
  useEffect(() => {
    checkPaymentStatus();
  }, [id]);

  const renderContent = () => {
    if (!paymentStatus) {
      return (
        <div className="text-center text-gray-600">
          Checking your payment status...
        </div>
      );
    }
    // paymentStatus.status="PENDING"
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
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Investment%20%26%20Diversification%20Bootcamp%20with%20Nikhil%20Sharma&dates=20250815T113000Z/20250815T133000Z&details=Join%20Nikhil%20Sharma%20for%20an%20exclusive%20bootcamp%20designed%20to%20help%20you%20master%20the%20art%20of%20investing%20and%20diversifying%20your%20portfolio.%0A%0AIn%20this%20session%2C%20you%20will%20learn%3A%0A%E2%80%A2%20Smart%20investment%20strategies%0A%E2%80%A2%20Risk%20management%20techniques%0A%E2%80%A2%20How%20to%20diversify%20for%20long-term%20financial%20growth%0A%E2%80%A2%20Practical%20tips%20for%20beginners%20and%20experienced%20investors%0A%0AWhether%20you%20are%20just%20starting%20your%20investment%20journey%20or%20looking%20to%20refine%20your%20strategies%2C%20this%20bootcamp%20will%20equip%20you%20with%20actionable%20insights%20to%20make%20smarter%20financial%20decisions.%0A%0A%F0%9F%93%85%20Date%3A%20Aug%2015%2C%202025%0A%F0%9F%95%92%20Time%3A%205%3A00%20PM%20-%207%3A%00%20PM%20IST%0A%F0%9F%93%8D%20Location%3A%20Online%20%28${"https:meet.google.com"}%20Meet%20link%29%0A%0ADon%E2%80%99t%20miss%20this%20chance%20to%20take%20control%20of%20your%20financial%20future%21&location=Online%20%28Google%20Meet%20link%29`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Add to Google Calendar
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
              We are waiting for confirmation from your payment provider.  
              Please refresh this page in a few minutes.
            </p>
            <div className="flex justify-center mt-6 items-center gap-x-4">
              <button onClick={() => navigate("/")} className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all">
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
              Unfortunately, your payment did not go through.  
              Please try again or contact support if the amount was deducted.
            </p>
            <div className="flex justify-center mt-6 items-center gap-x-4">
              <button onClick={() => navigate("/master-class/register")} className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all">
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
