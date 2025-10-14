import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import phonepe from "../../assets/phonepe.png";
import sabpaisa from "../../assets/sabpaisa.png";
import zwitch from "../../assets/Zwitch.svg";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelectProvider: (providerId: "Phonepe" | "SabPaisa" | "Zwitch") => void;
  finalPrice: number;
};

export const PaymentProviderModal = ({ isOpen, onClose, onSelectProvider, finalPrice }: Props) => {
  const [selectedProvider, setSelectedProvider] = useState<"Phonepe" | "SabPaisa" | "Zwitch" | null>(null);

  const providers = [
    {
      id: "Phonepe",
      name: "PhonePe",
      logo: phonepe,
      isActive: false,
      errorMessage: "Temporarily unavailable",
    },
    {
      id: "SabPaisa",
      name: "SabPaisa",
      logo: sabpaisa,
      isActive: false,
      errorMessage: "Temporarily unavailable",
    },
    {
      id: "Zwitch",
      name: "Zwitch",
      logo: zwitch,
      isActive: true,
      errorMessage: "",
    },
    
  ];

  const handleProceed = () => {
    if (selectedProvider) {
      onSelectProvider(selectedProvider);
      onClose();
    }
  };

  const handleProviderClick = (provider: typeof providers[0]) => {
    if (provider.isActive) {
      setSelectedProvider(provider.id as "Phonepe" | "SabPaisa" | "Zwitch" );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-5 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-white">Select Payment Method</h2>
            <p className="text-blue-100 text-sm mt-1">Choose your preferred payment provider</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Amount Display */}
          <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Amount to Pay</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900">₹ {finalPrice?.toFixed(2)}</span>
                <p className="text-xs text-gray-500">(inclusive of all taxes)</p>
              </div>
            </div>
          </div>

          {/* Payment Providers */}
          <div className="space-y-3 mb-6">
            {providers.map((provider) => (
              <div key={provider.id} className="relative">
                <button
                  onClick={() => handleProviderClick(provider)}
                  disabled={!provider.isActive}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    !provider.isActive
                      ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                      : selectedProvider === provider.id
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2 ${
                        !provider.isActive ? "grayscale" : ""
                      }`}>
                        <img
                          src={provider.logo}
                          alt={provider.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-left">
                        <span className={`font-semibold block ${
                          provider.isActive ? "text-gray-900" : "text-gray-500"
                        }`}>
                          {provider.name}
                        </span>
                        {!provider.isActive && provider.errorMessage && (
                          <span className="text-xs text-red-500 flex items-center mt-1">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {provider.errorMessage}
                          </span>
                        )}
                      </div>
                    </div>
                    {provider.isActive && (
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedProvider === provider.id
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedProvider === provider.id && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                    )}
                    {!provider.isActive && (
                      <div className="px-3 py-1 bg-gray-200 rounded-full">
                        <span className="text-xs font-medium text-gray-600">Disabled</span>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Security Info */}
          <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-xs font-medium text-green-900">Secure & Encrypted</p>
                <p className="text-xs text-green-700 mt-0.5">
                  All payments are 100% secure and encrypted
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleProceed}
              disabled={!selectedProvider}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                selectedProvider
                  ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-xl"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};