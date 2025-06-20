import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FaUserCheck, FaGoogle } from "react-icons/fa";
import { Lock, Sparkles, Shield } from "lucide-react";
import Link from "next/link";

import SignUpForm from "@/components/SignUpForm";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements - matching home page style */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-emerald-500/15 to-teal-500/15 rounded-full blur-md animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-md lg:max-w-lg px-2">
        <Card className="relative rounded-3xl border-0 bg-slate-800/95 backdrop-blur-xl shadow-2xl shadow-teal-500/10 overflow-hidden">
          {/* Gradient border effect - matching home page colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 rounded-3xl opacity-75">
            <div className="absolute inset-[1px] bg-slate-800 rounded-3xl"></div>
          </div>

          <div className="relative z-10">
            <CardHeader className="text-center space-y-4 pt-6 sm:pt-8 pb-4 sm:pb-6 px-4 sm:px-8">
              {/* Enhanced header with animated icon */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-teal-500 to-emerald-500 p-3 sm:p-4 rounded-full">
                    <FaUserCheck className="text-xl sm:text-2xl text-white" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 bg-clip-text text-transparent">
                  Create Account
                </CardTitle>
                <p className="text-gray-300 font-medium text-sm sm:text-base">
                  Join us and start your journey
                </p>
              </div>

              {/* Decorative separator */}
              <div className="flex items-center gap-4 mt-6">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-teal-400/50 to-transparent"></div>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-teal-400/50 to-transparent"></div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 px-4 sm:px-8">
              <SignUpForm />
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 sm:space-y-6 px-4 sm:px-8 pb-6 sm:pb-8">
              {/* Enhanced Terms section */}
              <div className="flex items-start gap-2 p-3 sm:p-4 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl border border-slate-600/50 mt-4">
                <Shield className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-relaxed">
                  By signing up, you agree to our{" "}
                  <Link
                    href="#"
                    className="text-teal-400 hover:text-teal-300 font-medium underline decoration-teal-400/50 hover:decoration-teal-300 transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="text-teal-400 hover:text-teal-300 font-medium underline decoration-teal-400/50 hover:decoration-teal-300 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Enhanced divider */}
              <div className="flex items-center gap-4 py-1">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
                <span className="text-xs sm:text-sm text-gray-400 font-medium px-3 py-1 bg-slate-700/50 rounded-full">
                  OR CONTINUE WITH
                </span>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
              </div>

              {/* Enhanced Google button */}
              <Button
                variant="outline"
                className="w-full h-11 sm:h-12 border-2 border-slate-600 hover:border-slate-500 bg-slate-700/50 hover:bg-slate-700 rounded-xl shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 text-sm sm:text-base"
              >
                <div className="flex items-center gap-3">
                  <FaGoogle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  <span className="font-medium text-gray-200">
                    Continue with Google
                  </span>
                </div>
              </Button>

              {/* Enhanced login link */}
              <div className="text-center pt-2">
                <p className="text-gray-300 mb-3 text-sm sm:text-base">
                  Already have an account?
                </p>
                <Button
                  variant="ghost"
                  className="group bg-gradient-to-r from-slate-700/50 to-slate-600/50 hover:from-slate-600/50 hover:to-slate-500/50 text-teal-400 hover:text-teal-300 font-medium rounded-xl px-4 sm:px-6 py-2 transition-all duration-200 text-sm sm:text-base"
                  asChild
                >
                  <Link
                    href="/auth/login"
                    className="flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                    <span>Sign In Instead</span>
                    <Lock className="w-4 h-4 group-hover:-rotate-12 transition-transform duration-200" />
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </div>
        </Card>

        {/* Floating elements for visual appeal - matching home page style */}
        <div className="absolute -top-4 -right-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute -bottom-4 -left-4 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full opacity-60 animate-bounce delay-500"></div>
        <div className="absolute top-10 -left-2 w-3 h-3 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute -top-2 right-10 w-5 h-5 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full opacity-50 animate-bounce delay-700"></div>
      </div>

      {/* Additional background effects matching home page */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900/10 via-transparent to-slate-900/10 pointer-events-none"></div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.05)_0%,transparent_50%)] pointer-events-none"></div>
    </div>
  );
}
