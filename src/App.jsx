import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Header,
  EventDetails,
  InstructorCard,
  CTA,
  TargetAudience,
  Timeline,
  Testimonials,
  MentorSection,
  OfferDetails,
  Bonuses,
  MoneyBackGuarantee,
  FAQ,
  Footer,
  Disclaimer
} from './components';
import { PrivacyPolicy, TermsAndConditions, RefundPolicy } from './pages';

const HomePage = () => (
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
          <OfferDetails />
          <FAQ />
        </div>
      </div>
    </div>
    <Disclaimer/>
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;