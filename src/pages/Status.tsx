import axios from "axios";
import NavBar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { PhonePePaymentStatusResponse } from "../types";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { masterclass } from "../data";
import { toast } from "react-toastify";

const Status = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [paymentStatus, setPaymentStatus] =
    useState<PhonePePaymentStatusResponse | null>(null);

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
        console.log("Payment Status Updated user:", update.data);
      }
      console.log("Payment Status Response:", response.data);
    } catch (error) {
      toast.error("Error checking payment status");
    }
  };

  console.log("Payment Status ID:", id, paymentStatus);
  useEffect(() => {
    checkPaymentStatus();
  }, [id]);

  const formatCalendarDate = (date: string, time: string) => {
    // Convert local date & time to UTC format for Google Calendar
    const [hours, minutes] = time.split(":").map(Number);
    const d = new Date(date);
    d.setHours(hours, minutes, 0);
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    masterclass.title
  )}&dates=${formatCalendarDate(
    masterclass.date,
    masterclass.start_time
  )}/${formatCalendarDate(
    masterclass.date,
    masterclass.end_time
  )}&details=${encodeURIComponent(
    masterclass.description +
      "\n\n💻 Meeting Link: " +
      masterclass.meeting_link +
      "\n📩 Support: " +
      masterclass.email
  )}&location=${encodeURIComponent(masterclass.location)}`;

  const renderContent = () => {
    if (!paymentStatus) {
      return (
        <div className="text-center text-gray-600">
          Checking your payment status...
        </div>
      );
    }
    // paymentStatus.status="COMPLETED"; // For testing purposes, you can remove this line in production
    switch (paymentStatus.status) {
      case "COMPLETED":
        return (
          <>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 drop-shadow-md text-center flex items-center justify-center gap-2">
              <CheckCircle className="text-green-500 w-8 h-8" />
              Thank You for Enrolling!
            </h1>
            <p className="text-lg text-gray-800 mb-6 text-center drop-shadow-sm">
              Your enrollment was successful. We are excited to have you on
              board!
            </p>
            <div className="flex justify-center mt-6 items-center gap-x-4">
              <a
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                href={googleCalendarUrl}
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
