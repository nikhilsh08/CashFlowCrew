import React from "react";
import { useNavigate } from 'react-router-dom';
export const CTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full lg:flex lg:justify-center">
      <div className="lg:w-1/2">
        <button
          onClick={() => navigate("/master-class/register")}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200"
        >
          Enroll Now for ₹499
        </button>
        <p className="mt-4 text-gray-600">
          Use code{" "}
          <span className="font-mono font-bold text-orange-600">
            MUTUALFUNDS100
          </span>{" "}
          on checkout
        </p>
      </div>
    </div>
  );
};
