"use client";
import { FaCheckCircle } from "react-icons/fa";
import { Lock, Mail, Sparkles, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const VerifiedPage = () => {
  useEffect(() => {
    document.title = "Verify User - MERN Invoice";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-teal-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute top-1/2 -right-4 w-80 h-80 bg-emerald-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-88 h-88 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-teal-400 rounded-full opacity-40 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md lg:max-w-lg">
        {/* Main card */}
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-8 lg:p-10 text-center transform hover:scale-105 transition-all duration-500 hover:shadow-3xl hover:shadow-teal-500/10">
          {/* Success icon with animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 lg:w-28 lg:h-28 mx-auto bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/30 animate-bounce">
              <FaCheckCircle className="text-white text-4xl lg:text-5xl animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 text-teal-400 animate-spin">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-2 -left-2 text-emerald-400 animate-ping">
              <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
            </div>
            {/* Additional decorative elements */}
            <div className="absolute top-1/2 -right-6 w-2 h-2 bg-teal-300 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute bottom-1/4 -left-6 w-1 h-1 bg-emerald-300 rounded-full opacity-70 animate-bounce animation-delay-1000"></div>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-4 animate-fade-in">
            Account Verified!
          </h1>

          {/* Success message */}
          <div className="space-y-6 mb-8">
            <p className="text-gray-300 text-lg lg:text-xl leading-relaxed">
              🎉 Your account has been successfully verified and is ready for
              use.
            </p>

            <div className="flex items-center justify-center space-x-3 text-gray-400 bg-slate-700/50 rounded-xl p-4 border border-slate-600/30">
              <Mail className="w-5 h-5 text-teal-400 flex-shrink-0" />
              <p className="text-sm lg:text-base">
                Confirmation email sent to your inbox
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-6">
            <Button
              asChild
              className="w-full h-12 lg:h-14 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/25 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/30"
            >
              <a
                href="/auth/login"
                className="flex items-center justify-center space-x-2 w-full"
              >
                <Lock className="w-5 h-5" />
                <span className="text-base lg:text-lg">
                  Login to Your Account
                </span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </Button>

            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <Shield className="w-4 h-4 text-teal-400" />
              <span>Secure access to</span>
              <span className="font-semibold text-teal-400">MERN Invoice</span>
            </div>
          </div>
        </div>

        {/* Additional info card */}
        <div className="mt-6 bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-700/30 hover:bg-slate-800/70 transition-all duration-300">
          <h3 className="font-semibold text-gray-200 mb-4 flex items-center justify-center space-x-2 text-base lg:text-lg">
            <Sparkles className="w-5 h-5 text-teal-400" />
            <span>What&apos;s Next?</span>
          </h3>
          <div className="space-y-3 text-sm lg:text-base text-gray-400">
            <div className="flex items-center space-x-3 hover:text-gray-300 transition-colors">
              <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 animate-pulse"></div>
              <span>Complete your profile setup</span>
            </div>
            <div className="flex items-center space-x-3 hover:text-gray-300 transition-colors">
              <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0 animate-pulse animation-delay-500"></div>
              <span>Create your first invoice</span>
            </div>
            <div className="flex items-center space-x-3 hover:text-gray-300 transition-colors">
              <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0 animate-pulse animation-delay-1000"></div>
              <span>Explore dashboard features</span>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 text-center space-y-3">
          <div className="flex items-center justify-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-sm">Secure Platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm">Trusted Service</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Your account is protected with industry-standard security
          </p>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-teal-400 rounded-full opacity-40 animate-ping"></div>
      <div className="absolute bottom-20 right-20 w-1 h-1 bg-emerald-400 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-1/2 left-5 w-1 h-1 bg-teal-300 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute top-1/4 right-10 w-1 h-1 bg-emerald-300 rounded-full opacity-40 animate-pulse animation-delay-2000"></div>
    </div>
  );
};

export default VerifiedPage;
