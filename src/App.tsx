import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import TagManager from "react-gtm-module";
// import ReactPixel from "react-facebook-pixel";
import {
  Header,
  EventDetails,
  InstructorCard,
  CTA,
  TargetAudience,
  Timeline,
  Testimonials,
  MentorSection,
  Bonuses,
  MoneyBackGuarantee,
  Disclaimer,
  FAQ,
  Footer,
} from "./components";
import {
  PrivacyPolicy,
  TermsAndConditions,
  RefundPolicy,
  DeliveryPolicy,
  ContactUs,
} from "./pages";
import MasterClass from "./pages/MasterClass";
import Status from "./pages/Status";
import { ToastContainer } from "react-toastify";

// Home Page
const HomePage: React.FC = () => (
  <>
    <div className="flex-1 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <Header />
          <div className="flex flex-col items-center space-y-8 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <EventDetails />
              <InstructorCard />
            </div>
            <CTA />
          </div>
          <TargetAudience />
          <Testimonials />
          <Timeline />
          <MentorSection />
          <Bonuses />
          <MoneyBackGuarantee />
          <FAQ />
        </div>
      </div>
    </div>
    <Disclaimer />
    <Footer />
  </>
);

// Hook to track page views for both GTM & Pixel
const usePageTracking = () => {
  const location = useLocation();
  useEffect(() => {
    // Google Tag Manager Page View Event
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        page: location.pathname,
      },
    });

    // Facebook Pixel Page View
    // ReactPixel.pageView();
  }, [location]);
};

const AppContent: React.FC = () => {
  usePageTracking();

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/delivery-policy" element={<DeliveryPolicy />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/payment/status/:id" element={<Status />} />
        <Route path="/master-class/register" element={<MasterClass />} />
        <Route path="/finance-bootcamp/register" element={<MasterClass />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    // ✅ Initialize GTM
    TagManager.initialize({ gtmId: "GTM-XXXXXXX" }); // replace with your GTM ID

    // ✅ Initialize Facebook Pixel
    // ReactPixel.init("123456789012345"); // replace with your Pixel ID
    // ReactPixel.pageView();
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
