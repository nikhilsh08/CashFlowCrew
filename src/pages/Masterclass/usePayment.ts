import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import type { Masterclass } from "../../types";
import { masterclassConfig } from "../../data";
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

const masterclassData: Masterclass[] = setTimeout(() => {
  return masterclassConfig;

}, 1500) as unknown as Masterclass[];  

export const usePayment = (masterclass: Masterclass | null) => {
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponPrice, setCouponPrice] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleApplyCoupon = async (couponCode: string) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/users/apply-coupon`,
        { code: couponCode.toLowerCase(), masterClassId: masterclass?._id }
      );

      if (res.data.success) {
        setCouponApplied(true);
        toast.success(
          "Coupon applied! ₹" + res.data.discountedAmount + " discount added."
        );
        setCouponPrice(res.data.discountedAmount);

        // Analytics tracking
        if (typeof window !== "undefined") {
          window.fbq?.("trackCustom", "CouponApplied", {
            code: couponCode,
          });
          window.gtag?.("event", "add_payment_info", {
            coupon: couponCode,
            currency: "INR",
          });
        }
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Error applying coupon"
      );
    }
  };

  const initiatePayment = async (data: FormData, finalPrice: number) => {
    setPaymentStatus(null);
    setIsProcessingPayment(true);

    // Analytics tracking
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

    // Save to localStorage
    localStorage.setItem("masterclass_registration", JSON.stringify(data));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/payments/initiate-sp-v1`,
        {
          amount: finalPrice,
          payerName: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          data: data,
        }
      );

      // Create form and submit to SabPaisa
      const form = document.createElement("form");
      form.method = "POST";
      form.action = response.data.redirectUrl;

      const fields: { [key: string]: any } = {
        encData: response.data.encryptedData,
        clientCode: response.data.clientCode,
      };

      for (const key in fields) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      setIsProcessingPayment(false);
      toast.error("Error initiating payment");
    }
  };

  return {
    couponApplied,
    couponPrice,
    paymentStatus,
    isProcessingPayment,
    setPaymentStatus,
    handleApplyCoupon,
    initiatePayment,
  };
};



export const SabPaisaPaymentIntegration = async (data: FormData, setIsProcessingPayment: (isProcessing: boolean) => void) => {
  try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/payments/initiate-sp-v1`,
          data
        );
        console.log("Payment initiation response:", response);
        if (response.data.success && response.data.formData) {
          const { spURL, encData, clientCode } = response.data.formData;
  
        if (!spURL || !encData || !clientCode) {
          throw new Error("Incomplete form data from server");
        }
      //   const selectedMasterclass = masterclassData?.reduce((prev, curr) => {
      //   const currDiff = Math.abs((curr.price + (curr.price * 0.18)) - data.amount);
      //   const prevDiff = Math.abs((prev.price + (prev.price * 0.18)) - data?.amount);
      //   return currDiff < prevDiff ? curr : prev;
      // });
  
        // ✅ Create and auto-submit form to SabPaisa
        const form = document.createElement("form");
        form.method = "POST";
        form.action = spURL;
        form.target = "_self";
  
        const encDataInput = document.createElement("input");
        encDataInput.type = "hidden";
        encDataInput.name = "encData";
        encDataInput.value = encData;
  
        const clientCodeInput = document.createElement("input");
        clientCodeInput.type = "hidden";
        clientCodeInput.name = "clientCode";
        clientCodeInput.value = clientCode;
  
        form.appendChild(encDataInput);
        form.appendChild(clientCodeInput);
  
        document.body.appendChild(form);
        form.submit();
        // if (typeof window !== "undefined") {
    //   window.fbq?.("track", "InitiateCheckout", {
    //     value: data.amount,
    //     currency: "INR",
    //     content_name: selectedMasterclass?.title || "Masterclass",
    //   });
    //   window.gtag?.("event", "begin_checkout", {
    //     currency: "INR",
    //     value: data.amount,
    //     items: [{ id: selectedMasterclass?._id, name: selectedMasterclass?.title }],
    //   });
    // }
      } else {
        throw new Error("Invalid payment response");
      }
        
  
        
      } catch (error) {
        setIsProcessingPayment(false);
        toast.error("Error initiating payment");
      }

}


export const phonePePaymentIntegration = async (data: FormData,setPaymentToken: (token: string | null) => void, setIsProcessingPayment: (isProcessing: boolean) => void) =>{
  try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/payments/initiate`,
        data
      );

      if (response.data.success && response.data.checkoutUrl) {
        setPaymentToken(response.data.checkoutUrl);
      } else {
        toast.error("Payment initiation failed. Please try again.");
      }
    } catch (error) {
      setIsProcessingPayment(false);
      toast.error("Error initiating payment");
    }
}



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
  Event?: string;
}

interface ZwitchResponse {
  success: boolean;
  paymentToken: string;
  orderId: string;
  amount: string;
  hash: string;
  accessKey: string;
  environment: 'test' | 'live';
  remoteScript: string;
}

declare global {
  interface Window {
    Layer?: {
      checkout: (
        config: { token: string; accesskey: string },
        successCallback: (response: any) => void,
        errorCallback: (error: any) => void
      ) => void;
    };
  }
}

export const useZwitchPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [zwitchData, setZwitchData] = useState<ZwitchResponse | null>(null);

  const initiateZwitchPayment = async (data: FormData) => {
    try {
      setIsLoading(true);

      // Call backend to create payment token
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/payments/initiate-zw-v1`,
        data
      );
      
      if (!response.data.success) {
        throw new Error('Failed to initiate Zwitch payment');
      }
      
      setZwitchData(response.data);
      
      // Load Layer SDK script dynamically
      await loadLayerScript(response.data.remoteScript);
      
      // Trigger payment
      await triggerZwitchCheckout(response.data);
      return response.data;

    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Failed to initiate Zwitch payment');
      console.error('Zwitch payment error:', error);
    }
  };

  const loadLayerScript = (scriptUrl: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if script already loaded
      if (window.Layer) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;

      script.onload = () => {
        resolve();
      };

      script.onerror = () => {
        reject(new Error('Failed to load Layer payment SDK'));
      };

      document.head.appendChild(script);
    });
  };

  const triggerZwitchCheckout = async (paymentData: ZwitchResponse) => {
    if (!window.Layer) {
      toast.error('Payment gateway not loaded. Please try again.');
      setIsLoading(false);
      return;
    }

    window.Layer.checkout(
      {
        token: paymentData.paymentToken,
        accesskey: paymentData.accessKey,
      },
       async (response: any) => {
        // Success callback
        console.log('Layer payment response:', response);

        if (response && response.payment_id) {
          // Send payment details to backend for verification
          await verifyZwitchPayment(
            paymentData,
            response.payment_id
          );
          // console.log("payment success", paymentData,response.payment_id);
          window.location.href = `/payment/status/${paymentData.orderId}`;
          return;
        } else {
          setIsLoading(false);
          toast.error('Payment response invalid');
          // console.log("payment_id not found",response);
          window.location.href = `/payment/status/${paymentData.orderId}`;
        return;
        }
      },
      (error: any) => {
        // Error callback
        setIsLoading(false);
        toast.error(error?.message || 'Payment failed');
        console.error('Layer payment error:', error);
      }
    );
  };

  const verifyZwitchPayment = async (
    paymentData: ZwitchResponse,
    paymentId: string
  ) => {
    try {
      // Call backend to verify and process payment
      // console.log('Verifying payment with ID:', paymentId, paymentData);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/payments/verify-zw-v1`,
        {
          layer_payment_id: paymentId,
          layer_pay_token_id: paymentData.paymentToken,
          tranid: paymentData.orderId,
          layer_order_amount: paymentData.amount,
          hash: paymentData.hash,
        }
      );
      // console.log('Payment verification response..........:', response);

      // masterclass has two array filter the array and select the particular massterclass index based on price of masterclass which is closer to the amount paid by user so subtract with paymentdata.amount and which is minium that masterclass will be selected
      const selectedMasterclass = masterclassData?.reduce((prev, curr) => {
        const currDiff = Math.abs((curr.price + (curr.price * 0.18)) - parseInt(paymentData.amount));
        const prevDiff = Math.abs((prev.price + (prev.price * 0.18)) - parseInt(paymentData.amount));
        return currDiff < prevDiff ? curr : prev;
      });

      console.log('Selected Masterclass:', selectedMasterclass);

      setIsLoading(false);

      if (response.data.success) {
        toast.success('Payment successful!');
        if (typeof window !== "undefined") {
      window.fbq?.("track", "InitiateCheckout", {
        value: paymentData.amount,
        currency: "INR",
        content_name: selectedMasterclass?.title || "Masterclass",
      });
      window.gtag?.("event", "begin_checkout", {
        currency: "INR",
        value: paymentData.amount,
        items: [{ id: selectedMasterclass?._id, name: selectedMasterclass?.title }],
      });
    }
        // Redirect to success page or handle next steps
        window.location.href = `/payment/status/${paymentData.orderId}?status=success`;
      } else {
        toast.error('Payment verification failed');
      }

    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Payment verification failed');
      // console.error('Payment verification error:', error);
    }
  };

  return {
    isLoading,
    zwitchData,
    initiateZwitchPayment,

  };
};

