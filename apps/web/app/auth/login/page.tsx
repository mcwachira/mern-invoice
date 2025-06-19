"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, User, Sparkles, Shield, LogIn } from "lucide-react";
import AuthWrapper from "@/components/AuthWrapper";
import Link from "next/link";
import SignInForm from "@/components/SignInPage";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute top-1/3 -right-8 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-88 h-88 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-emerald-300 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md lg:max-w-lg">
        {/* Main login card */}
        <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
          <CardContent className="p-8 lg:p-10 space-y-8">
            {/* Header with icon */}
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 text-yellow-400 animate-pulse">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-gray-600 mt-2">
                  Sign in to your account to continue
                </p>
              </div>
            </div>

            {/* Decorative separator */}
            <div className="relative">
              <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 bg-white px-3">
                <Shield className="w-4 h-4 text-emerald-500" />
              </div>
            </div>

            {/* Login form placeholder */}

            <SignInForm />
            {/* <div className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 pl-12 text-emerald-600 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pl-12 text-emerald-600 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                  />
                  <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <Link
                  href="#"
                  className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                Sign In to Account
              </Button>
            </div> */}

            {/* Google sign in section */}
            <div className="space-y-4">
              {/* <div className="flex items-center gap-4">
                <Separator className="flex-grow bg-gradient-to-r from-gray-200 to-gray-300" />
                <span className="text-gray-500 text-sm font-medium px-3 bg-gray-50 rounded-full py-1">
                  OR CONTINUE WITH
                </span>
                <Separator className="flex-grow bg-gradient-to-r from-gray-300 to-gray-200" />
              </div> */}

              <Button
                variant="outline"
                className="w-full border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-5 h-5 mr-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="font-medium text-emerald-600">
                  Continue with Google
                </span>
              </Button>
            </div>

            {/* Divider */}
            <Separator className="bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />

            {/* Sign up link */}
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4">
                <p className="text-gray-700 text-sm mb-2">
                  Don't have an account?
                </p>
                <a
                  href="/auth/register"
                  className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors duration-300"
                >
                  <User className="w-4 h-4" />
                  <span>Create New Account</span>
                </a>
              </div>
            </div>

            {/* Resend verification */}
            <div className="text-center bg-gray-50 rounded-xl p-4">
              <p className="text-gray-600 text-sm mb-2">
                Didn't receive verification email?
              </p>
              <a
                href="/resend"
                className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                <span>Resend Verification</span>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Trust indicators */}
        <div className="mt-8 text-center space-y-3">
          <div className="flex items-center justify-center space-x-6 text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm">Secure Login</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span className="text-sm">Trusted Platform</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Protected by industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
