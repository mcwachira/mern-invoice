"use client";
import { DollarSign, Sparkles, Heart } from "lucide-react";
import Link from "next/link";

const Copyright = () => {
  return (
    <div className="text-center space-y-2">
      <div className="flex items-center justify-center space-x-2 text-emerald-100/80">
        <Heart className="w-3 h-3 text-emerald-300 animate-pulse" />
        <span className="text-xs md:text-sm">
          Made with passion for invoicing excellence
        </span>
        <Heart className="w-3 h-3 text-emerald-300 animate-pulse" />
      </div>
      <p className="text-xs md:text-sm text-emerald-100/70">
        ©{" "}
        <a
          className="text-emerald-300 hover:text-emerald-200 underline decoration-emerald-400/50 hover:decoration-emerald-300 transition-all duration-300 font-medium"
          href="https://github.com/API-Imperfect"
          target="_blank"
          rel="noopener noreferrer"
        >
          MERN Invoice
        </a>{" "}
        {new Date().getFullYear()} • All rights reserved
      </p>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className=" bg-gradient-to-r from-emerald-900 via-teal-800 to-cyan-900 w-full mt-auto py-4 md:py-6 px-4 fixed bottom-0 border-t border-emerald-700/30 backdrop-blur-sm">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-800/20 via-teal-700/20 to-cyan-800/20 animate-pulse"></div>

      {/* Floating sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-300 rounded-full opacity-30 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main tagline */}
        <div className="text-center mb-3 md:mb-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-emerald-200">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 md:w-7 md:h-7 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <DollarSign className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
              <span className="text-sm md:text-base font-medium bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Because Money is as important as oxygen!
              </span>
              <div className="w-6 h-6 md:w-7 md:h-7 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg animate-bounce animation-delay-500">
                <DollarSign className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Decorative line */}
          <div className="flex items-center justify-center mt-3 md:mt-4 space-x-2">
            <div className="h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent flex-1 max-w-20"></div>
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin-slow" />
            <div className="h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent flex-1 max-w-20"></div>
          </div>
        </div>

        {/* Copyright section */}
        <Copyright />

        {/* Additional links for larger screens */}
        <div className="hidden md:flex items-center justify-center mt-4 space-x-6 text-xs text-emerald-200/60">
          <Link
            href="#"
            className="hover:text-emerald-300 transition-colors duration-300"
          >
            Privacy Policy
          </Link>
          <span>•</span>
          <Link
            href="#"
            className="hover:text-emerald-300 transition-colors duration-300"
          >
            Terms of Service
          </Link>
          <span>•</span>
          <Link
            href="#"
            className="hover:text-emerald-300 transition-colors duration-300"
          >
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
