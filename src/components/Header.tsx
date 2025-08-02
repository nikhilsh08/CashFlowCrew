"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu if window is resized to desktop view
  useEffect(() => {
    if (!isMobileView) {
      setIsMenuOpen(false);
    }
  }, [isMobileView]);

  return (
    <nav
      className={`bg-white shadow-md sticky top-0 z-50 border-b border-gray-200 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between mx-2 px-6 max-sm:px-2 py-2">
        <div className="*:text-[#F79B72]">
          <Link href="/" className="text-2xl font-bold max-sm:text-lg">
            CashFlowCrew
          </Link>
          <p className="text-sm max-sm:text-xs">Master your Finances</p>
        </div>
        {isMobileView ? (
          <div>
            {/* Menu/X Icon Toggle with smooth transition */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative bottom-3 h-6 w-6 text-gray-700 cursor-pointer"
              aria-label="Toggle menu"
            >
              <Menu
                className={`absolute transition-all duration-300 ease-in-out ${
                  isMenuOpen
                    ? "opacity-0 rotate-90 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`absolute transition-all duration-300 ease-in-out ${
                  isMenuOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-0"
                }`}
              />
            </button>
            {/* Mobile Nav Menu with smooth transition */}
            <div
              className={`absolute top-full right-0 w-full bg-white shadow-lg rounded-b-lg p-4 space-y-2 transform transition-all duration-300 ease-in-out ${
                isMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
            >
              <Link
                href="/"
                className="block text-gray-700 hover:text-[#F79B72]"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block text-gray-700 hover:text-[#F79B72]"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/Contact-us"
                className="block text-gray-700 hover:text-[#F79B72]"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-x-6 mr-5">
            <Link href="/" className="text-gray-700 hover:text-[#F79B72]">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#F79B72]">
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-[#F79B72]"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};