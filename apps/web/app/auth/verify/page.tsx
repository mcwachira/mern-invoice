"use client";
import { FaCheckCircle } from "react-icons/fa";
import { Lock, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const VerifiedPage = () => {
  useEffect(() => {
    document.title = "Verify User - MERN Invoice";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 -right-4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-300 rounded-full opacity-30 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 text-center transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
          {/* Success icon with animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <FaCheckCircle className="text-white text-4xl animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 text-yellow-400 animate-spin">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-2 -left-2 text-emerald-400 animate-ping">
              <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 animate-fade-in">
            Account Verified!
          </h1>

          {/* Success message */}
          <div className="space-y-4 mb-8">
            <p className="text-gray-600 text-lg leading-relaxed">
              🎉 Your account has been successfully verified and is ready for
              use.
            </p>

            <div className="flex items-center justify-center space-x-2 text-gray-500 bg-gray-50 rounded-lg p-3">
              <Mail className="w-5 h-5 text-emerald-500" />
              <p className="text-sm">Confirmation email sent to your inbox</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-4">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <a
                href="/auth/login"
                className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
              >
                <Lock className="w-5 h-5" />
                <span>Login to Your Account</span>
              </a>
            </Button>

            <p className="text-sm text-gray-500 flex items-center justify-center space-x-1">
              <span>Secure access to</span>
              <span className="font-semibold text-emerald-600">
                MERN Invoice
              </span>
            </p>
          </div>
        </div>

        {/* Additional info card */}
        <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <span>What's Next?</span>
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span>Complete your profile setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
              <span>Create your first invoice</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span>Explore dashboard features</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifiedPage;
