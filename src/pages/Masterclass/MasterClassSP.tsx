import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle, User, Calendar, Clock, Users, Star } from "lucide-react";
import NavBar from "../../components/NavBar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from 'react-router-dom';
import type { Masterclass } from "../../types";
import { formatdate, formatTime } from "../../lib/utils";
import { phonePePaymentIntegration, SabPaisaPaymentIntegration } from "./usePayment";
import { PaymentProviderModal } from "./PaymentProviderModal";
import { useZwitchPayment } from "./usePayment";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coupon?: string;
  city: string;
  gstNumber?: string;
  companyName?: string;
  amount: number;
}

// Zwitch Payment Integration


const MasterClass = ({ masterclass }: { masterclass: Masterclass | null }) => {
  const [showGSTFields, setShowGSTFields] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponPrice, setCouponPrice] = useState(0);
  const [paymentToken, setPaymentToken] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentProvider, setPaymentProvider] = useState<"Phonepe" | "SabPaisa" | "Zwitch" | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);
  const location = useLocation();

  const isFinanceBootCamp = location.pathname.includes("finance-bootcamp");
  const { isLoading: zwitchLoading, initiateZwitchPayment } = useZwitchPayment();
  console.warn(paymentProvider)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      phone: "",
      coupon: "",
      gstNumber: "",
      companyName: "",
    },
  });

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return (
      phoneRegex.test(phone) || "Enter a valid 10-digit Indian mobile number"
    );
  };

  const handleApplyCoupon = async () => {
    const couponCode = watch("coupon")?.toLowerCase();
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/users/apply-coupon`, {
        code: couponCode,
        masterClassId: masterclass?._id
      });

      if (res.data.success) {
        setCouponApplied(true);
        toast.success("Coupon applied! ₹" + res.data.discountedAmount + " discount added.");
        setCouponPrice(res.data.discountedAmount);

        // Fire events
        window.fbq?.("trackCustom", "CouponApplied", { code: couponCode });
        window.gtag?.("event", "add_payment_info", {
          coupon: couponCode,
          currency: "INR",
        });
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error applying coupon");
    }
  };

  // Price calculation
  const { basePrice, gst, discount, finalPrice } = useMemo(() => {
    const basePrice = masterclass?.price || 0;
    const gst = Math.round(basePrice * 0.18);
    const discount = couponApplied ? couponPrice : 0;
    const finalPrice = basePrice + gst - discount;
    // const finalPrice = 1;
    return { basePrice, gst, discount, finalPrice };
  }, [couponApplied, couponPrice, masterclass?.price]);

  useEffect(() => {
    const storedData = localStorage.getItem("masterclass_registration");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      reset(parsedData);
    }
  }, [reset]);

  // Handle payment provider selection
  const handlePaymentProviderSelect = (provider: "Phonepe" | "SabPaisa" | "Zwitch") => {
    setPaymentProvider(provider);

    if (pendingFormData) {
      processPayment(pendingFormData, provider);
    }
  };

  const processPayment = async (
    data: FormData,
    paymentProvider: "Phonepe" | "SabPaisa" | "Zwitch"
  ) => {
    data.amount = finalPrice;
    setPaymentStatus(null);
    setIsProcessingPayment(true);

    try {
      if (paymentProvider === "SabPaisa") {
        await SabPaisaPaymentIntegration(data, setIsProcessingPayment);
      } else if (paymentProvider === "Phonepe") {
        await phonePePaymentIntegration(data, setPaymentToken, setIsProcessingPayment);
      } else if (paymentProvider === "Zwitch") {
        // Use the new Zwitch hook
        setIsProcessingPayment(true);
        await initiateZwitchPayment({
          ...data,
          Event: masterclass?._id || '',
          amount: finalPrice,
        });
      }
    } catch (error) {
      setIsProcessingPayment(false);
      toast.error('Payment initialization failed');
    }
  };

  const onSubmit = async (data: FormData) => {
    if (typeof window !== "undefined") {
      window.fbq?.("track", "InitiateCheckout", {
        value: finalPrice,
        currency: "INR",
        content_name: masterclass?.title || "Masterclass",
      });
      window.gtag?.("event", "begin_checkout", {
        currency: "INR",
        value: finalPrice,
        items: [{ id: masterclass?._id, name: masterclass?.title }],
      });
    }

    localStorage.setItem("masterclass_registration", JSON.stringify(data));

    // Check if price is higher than 1000
    if ((masterclass?.price || 0) > 1000) {
      // Automatically use PhonePe without showing modal
      processPayment(data, "Phonepe");
    } else {
      // Show payment provider modal for prices <= 1000
      setPendingFormData(data);
      setIsPaymentModalOpen(true);
    }
  };

  useEffect(() => {
    if (paymentToken) {
      // For Zwitch, open in same tab like other providers
      window.open(paymentToken, "_self", "noopener,noreferrer");
      setIsProcessingPayment(false);
    }
  }, [paymentToken]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("paymentStatus");
    if (status) {
      setPaymentStatus(status);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const duration = parseInt(masterclass?.duration ?? "1");
  const startDate = masterclass?.date ? new Date(masterclass.date) : new Date();
  const endDate = new Date(startDate);

  if (duration > 1) {
    endDate.setDate(startDate.getDate() + (duration - 1));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Error Messages */}
      {paymentStatus === "PAYMENT_ERROR" && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">
              Something went wrong with the payment. Please try again.
            </span>
            <button
              onClick={() => setPaymentStatus(null)}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <span className="sr-only">Dismiss</span>✕
            </button>
          </div>
        </div>
      )}

      {paymentStatus === "SDK_ERROR" && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative"
            role="alert"
          >
            <strong className="font-bold">SDK Error!</strong>
            <span className="block sm:inline">
              Failed to load payment gateway. Please refresh the page.
            </span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 mt-12 sm:px-6 lg:px-8 py-8">
        <div className="pb-24 lg:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-8 py-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      Payment Details
                    </h2>
                  </div>
                </div>

                <div className="p-8">
                  {/* Personal Details */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Personal Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <input
                          {...register("firstName", {
                            required: "First name is required",
                          })}
                          type="text"
                          placeholder="Enter First Name"
                          className="w-full px-5 py-4 bg-gray-50 text-gray-900 placeholder-gray-500 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          {...register("lastName", {
                            required: "Last name is required",
                          })}
                          type="text"
                          placeholder="Enter Last Name"
                          className="w-full px-5 py-4 bg-gray-50 text-gray-900 placeholder-gray-500 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <input
                        {...register("email", {
                          required: "Email is required",
                        })}
                        type="email"
                        placeholder="Enter Email"
                        className="w-full px-5 py-4 bg-gray-50 text-gray-900 placeholder-gray-500 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-6">
                      <div className="flex border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
                        <div className="flex items-center px-4 py-4 max-md:px-5 bg-gray-50 border-r border-gray-300">
                          <img
                            src="https://flagcdn.com/w20/in.png"
                            alt="India"
                            className="w-5 h-3 mr-2 max-sm:mr-1"
                          />
                          <span className="text-gray-900 font-medium max-md:font-normal max-md:text-sm">
                            +91
                          </span>
                        </div>
                        <input
                          {...register("phone", {
                            required: "Phone number is required",
                            validate: validatePhone,
                          })}
                          type="tel"
                          placeholder="Enter Phone Number"
                          maxLength={10}
                          minLength={10}
                          className="flex-1 px-5 py-4 bg-gray-50 text-gray-900 placeholder-gray-500 outline-none"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-2 ml-2">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-6">
                      <input
                        {...register("city", {
                          required: "City is required",
                        })}
                        type="text"
                        placeholder="City, State"
                        className="w-full px-5 py-4 bg-gray-50 text-gray-900 placeholder-gray-500 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="gst"
                        checked={showGSTFields}
                        onChange={(e) => setShowGSTFields(e.target.checked)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="gst"
                        className="text-gray-700 font-medium"
                      >
                        Add GST Details (Optional)
                      </label>
                    </div>

                    {showGSTFields && (
                      <div className="mt-6 space-y-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <input
                          {...register("gstNumber")}
                          type="text"
                          placeholder="GST Number"
                          className="w-full px-5 py-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <input
                          {...register("companyName")}
                          type="text"
                          placeholder="Company Name"
                          className="w-full px-5 py-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    )}
                  </div>

                  {/* Offers & Benefits */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Offers & Benefits
                    </h3>
                    <div className="relative">
                      <input
                        {...register("coupon")}
                        type="text"
                        placeholder="Coupon Code"
                        className="w-full px-5 py-4 pr-24 bg-gray-50 text-gray-900 placeholder-gray-500 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold text-sm transition-all duration-200"
                      >
                        Apply
                      </button>
                    </div>
                    {couponApplied && (
                      <p className="text-green-600 text-sm mt-3 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Coupon applied successfully!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - workshop Details & Pricing */}
            <div className="lg:col-span-2 space-y-6">
              {/* workshop Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6 text-white">
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      100% MONEY BACK
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium opacity-90 mb-1">
                      EQUITY MUTUAL FUNDS
                    </p>
                    <h2 className="text-2xl font-bold mb-1">{isFinanceBootCamp ? "BOOTCAMP" : "MASTER CLASS"}</h2>
                    <p className="text-sm opacity-90">
                      100% Money-back guarantee
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-300" />
                    </div>
                    <div>
                      <p className="text-sm opacity-90">With</p>
                      <p className="font-bold">Nikhil Sharma</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {masterclass?.title}
                  </h3>
                  <div className="mb-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-x-3 gap-y-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0 -mt-0.5">
                          <p className="text-xs font-light text-gray-500 mt-[-1px]">Date</p>
                          <p className="text-gray-900 font-normal text-sm leading-relaxed">
                            {duration === 1
                              ? formatdate(startDate)
                              : `${formatdate(startDate)} – ${formatdate(endDate)}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-x-3 gap-y-2">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Clock className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0 -mt-0.5">
                          <p className="text-xs font-light text-gray-500 mb-1">Time</p>
                          <p className="text-gray-900 font-normal text-sm mt-[-4px]">
                            {formatTime(masterclass?.start_time)} – {formatTime(masterclass?.end_time)} (IST)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">{masterclass?.duration} Duration</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">Live Session</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">
                        Interactive Workshop
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Card - Hidden on mobile/tablet due to sticky bar */}
              <div className="hidden lg:block bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Bill Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Price</span>
                    <span className="font-bold text-lg">
                      ₹ {basePrice.toFixed(2)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Discount </span>
                      <span className="font-semibold">
                        - ₹ {discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">GST (18%)</span>
                    <span className="font-semibold">₹ {gst.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">
                        To Pay
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        ₹ {finalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSubmit(onSubmit)}
                  disabled={isProcessingPayment}
                  className={`w-full mt-6 py-4 ${isProcessingPayment
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-blue-700 hover:to-purple-700"
                    } text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                >
                  {isProcessingPayment ? "Processing..." : "Proceed to Pay"}
                </button>
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500 mb-1">
                    For any queries, please email us at
                  </p>
                  <a
                    href="mailto:support@cashflowcrew.in"
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    support@cashflowcrew.in
                  </a>
                  <p className="text-xs text-gray-400 mt-3">
                    © cashflowcrew Club 2025
                  </p>
                  <p className="text-xs text-gray-400">
                    All Rights Reserved. One Club Ventures Pvt. Ltd.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Sticky Bottom Payment Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">
                ₹ {finalPrice.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500">(incl. GST)</span>
            </div>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isProcessingPayment}
              className={`px-8 py-3 ${isProcessingPayment
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-blue-700 hover:to-purple-700"
                } text-white rounded-xl font-bold transition-all duration-200 shadow-lg`}
            >
              {isProcessingPayment ? "Processing..." : "Proceed to Pay"}
            </button>
          </div>
        </div>
      </div>

      {/* Payment Provider Modal */}
      {isPaymentModalOpen && (
        <PaymentProviderModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setPendingFormData(null);
          }}
          onSelectProvider={handlePaymentProviderSelect}
          finalPrice={finalPrice}
        />
      )}
      {(isProcessingPayment || zwitchLoading) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-lg p-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-center text-gray-700">Processing payment...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterClass;