// App.tsx
import React, { useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import TagManager from "react-gtm-module";
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
import { useMasterclass } from "./hooks/useMasterclass";
import MovingLoader from "./components/Loader";  
// ---------------- Context Setup ----------------
type MasterclassContextType = ReturnType<typeof useMasterclass>;

const MasterclassContext = createContext<MasterclassContextType | null>(null);

export const useMasterclassContext = () => {
  const ctx = useContext(MasterclassContext);
  if (!ctx) {
    throw new Error("useMasterclassContext must be used inside <MasterclassProvider>");
  }
  return ctx;
};

const MasterclassProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const masterclassState = useMasterclass();
  return (
    <MasterclassContext.Provider value={masterclassState}>
      {children}
    </MasterclassContext.Provider>
  );
};
// ------------------------------------------------

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
const AppContent: React.FC = () => {
  const location = useLocation();
  const { masterclass, loading, error } = useMasterclassContext();
  // console.log("Masterclass data in AppContent:", masterclass);

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: { event: "pageview", page: location.pathname },
    });
  }, [location]);

  if (loading) return <MovingLoader size={240} animationType="bounce" speed={1.2} className="mt-20" />;
  if (error) return <p>Error loading masterclass</p>;

  const bootcamp = masterclass?.[0];
  const workshop = masterclass?.[1];

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
        <Route
          path="/master-class/register"
          element={workshop ? <MasterClass masterclass={workshop} /> : <p>Loading...</p>}
        />
        <Route
          path="/finance-bootcamp/register"
          element={bootcamp ? <MasterClass masterclass={bootcamp} /> : <p>Loading...</p>}
        />
      </Routes>
    </div>
  );
};


const App: React.FC = () => {
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-XXXXXXX" }); // replace with your GTM ID
  }, []);

  return (
    <Router>
      <MasterclassProvider>
        <AppContent />
      </MasterclassProvider>
    </Router>
  );
};

export default App;


