"use client";
import React, { useEffect, useState } from "react";
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
} from "@/components";

const HomePage: React.FC = () => {
  // Set initial countdown time in seconds (e.g., 10 minutes = 600 seconds)
  const initialTime = 10 * 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      <div className="flex-1  bg-[#EEEEEE] text-[#2A4759] w-full  ">
        <div className="w-full mx-auto ">
          <div className="text-center">
            <Header />

            <div className="flex flex-col items-center space-y-8 w-[99%] px-2 mx-2 mt-2 py-2 min-h-screen rounded-md bg-[#DDDDDD]  ">
              <div className="pt-28 md:pt-36 w-11/12 max-sm:pt-12">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Master Mutual Funds:{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
                    Invest Smarter
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  EXPOSED: The Risk Analysis Secrets Wall Street Uses to Pick
                  Mutual Funds (That Your Financial Advisor Never Told You
                  About)
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                  <div className="px-6 py-3 bg-red-50 rounded-xl border border-red-100">
                    <p className="text-red-600 font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      Hurry! Only {minutes}:
                      {seconds.toString().padStart(2, "0")} minutes left to
                      enroll
                    </p>
                  </div>
                </div>
                {/* divide grid width 60:40  */}

                <div className="grid grid-cols-1 md:grid-cols-[40%_60%] min-h-[80vh]  gap-3 w-full ">
                  <InstructorCard />
                  <EventDetails />
                </div>
              </div>

              <TargetAudience />
              <Testimonials />
              <Timeline />
              <MentorSection />
              <Bonuses />
              <MoneyBackGuarantee />
              {/* <OfferDetails /> */}
              <FAQ />
            </div>
          </div>
        </div>
      </div>
      <Disclaimer />
      <Footer />
    </>
  );
};

export default HomePage;
