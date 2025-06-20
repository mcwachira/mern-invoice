"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, User, Sparkles, Shield, LogIn, Chrome } from "lucide-react";
import AuthWrapper from "@/components/AuthWrapper";
import Link from "next/link";
import SignInForm from "@/components/SignInPage";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-teal-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute top-1/3 -right-8 w-80 h-80 bg-emerald-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-88 h-88 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-teal-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md lg:max-w-lg">
        {/* Main login card */}
        <Card className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-3xl hover:shadow-teal-500/10">
          <CardContent className="p-8 lg:p-10 space-y-8">
            {/* Header with icon */}
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 text-teal-400 animate-pulse">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-gray-400 mt-2">
                  Sign in to your account to continue
                </p>
              </div>
            </div>

            {/* Decorative separator */}
            <div className="relative">
              <Separator className="bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-slate-800 px-3">
                <Shield className="w-4 h-4 text-teal-400" />
              </div>
            </div>

            {/* Login form */}
            <SignInForm />

            {/* Divider */}
            <div className="relative">
              <Separator className="bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-slate-800 px-3">
                <span className="text-gray-500 text-xs">OR</span>
              </div>
            </div>

            {/* Google sign in section */}
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full border-2 border-slate-600 hover:border-teal-500 hover:bg-slate-700/50 py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] text-gray-300 hover:text-white bg-slate-800/50"
              >
                <Chrome className="w-5 h-5 mr-3 text-teal-400" />
                <span className="font-medium">Continue with Google</span>
              </Button>
            </div>

            {/* Divider */}
            <Separator className="bg-gradient-to-r from-transparent via-slate-600 to-transparent" />

            {/* Sign up link */}
            <div className="text-center space-y-4">
              <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
                <p className="text-gray-400 text-sm mb-2">
                  Don't have an account?
                </p>
                <Link
                  href="/auth/register"
                  className="inline-flex items-center space-x-2 text-teal-400 hover:text-teal-300 font-semibold hover:underline transition-colors duration-300"
                >
                  <User className="w-4 h-4" />
                  <span>Create New Account</span>
                </Link>
              </div>
            </div>

            {/* Resend verification */}
            <div className="text-center bg-slate-700/20 border border-slate-600/20 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-2">
                Didn't receive verification email?
              </p>
              <Link
                href="/auth/resend"
                className="inline-flex items-center space-x-2 text-teal-400 hover:text-teal-300 font-medium hover:underline transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                <span>Resend Verification</span>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Trust indicators */}
        <div className="mt-8 text-center space-y-3">
          <div className="flex items-center justify-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-sm">Secure Login</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm">Trusted Platform</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Protected by industry-standard encryption
          </p>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-teal-400 rounded-full opacity-40 animate-ping"></div>
      <div className="absolute bottom-20 right-20 w-1 h-1 bg-emerald-400 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-1/2 left-5 w-1 h-1 bg-teal-300 rounded-full opacity-30 animate-bounce"></div>
    </div>
  );
};

export default LoginPage;
