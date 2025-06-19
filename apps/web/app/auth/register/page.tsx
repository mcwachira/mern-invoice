import { Button } from "@/features/auth/SignUpForm;
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FaUserCheck, FaGoogle } from "react-icons/fa";
import { Lock, Sparkles, Shield } from "lucide-react";
import Link from "next/link";
import AuthWrapper from "@/components/AuthWrapper";
import SignUpForm from "@/features/auth/SignUpForm";

export default function RegisterPage() {
  return (
    <AuthWrapper>
      <div className="w-full max-w-md px-2">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>

        <Card className="relative rounded-3xl border-0 bg-white/95 backdrop-blur-xl shadow-2xl shadow-purple-500/10 overflow-hidden">
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl opacity-75">
            <div className="absolute inset-[1px] bg-white rounded-3xl"></div>
          </div>

          <div className="relative z-10">
            <CardHeader className="text-center space-y-4 pt-8 pb-6">
              {/* Enhanced header with animated icon */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full">
                    <FaUserCheck className="text-2xl text-white" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Create Account
                </CardTitle>
                <p className="text-gray-600 font-medium">
                  Join us and start your journey
                </p>
              </div>

              {/* Decorative separator */}
              <div className="flex items-center gap-4 mt-6">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
                <Sparkles className="w-5 h-5 text-purple-500" />
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 px-8">
              <SignUpForm />
            </CardContent>

            <CardFooter className="flex flex-col space-y-6 px-8 pb-8">
              {/* Enhanced Terms section */}
              <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 mt-4">
                <Shield className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <p className="text-xs text-gray-600 leading-relaxed">
                  By signing up, you agree to our{" "}
                  <Link
                    href="#"
                    className="text-purple-600 hover:text-purple-700 font-medium underline decoration-purple-300 hover:decoration-purple-500 transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="text-purple-600 hover:text-purple-700 font-medium underline decoration-purple-300 hover:decoration-purple-500 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Enhanced Create Account button */}
              {/* <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-[1.02] transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  Create Account
                  <Sparkles className="w-4 h-4" />
                </span>
              </Button> */}

              {/* Enhanced divider */}
              <div className="flex items-center gap-4 py-1">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <span className="text-sm text-gray-500 font-medium px-3 py-1 bg-gray-50 rounded-full">
                  OR CONTINUE WITH
                </span>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>

              {/* Enhanced Google button */}
              <Button
                variant="outline"
                className="w-full h-12 border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 rounded-xl shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <FaGoogle className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-gray-700">
                    Continue with Google
                  </span>
                </div>
              </Button>

              {/* Enhanced login link */}
              <div className="text-center pt-2">
                <p className="text-gray-600 mb-3">Already have an account?</p>
                <Button
                  variant="ghost"
                  className="group bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-600 hover:text-purple-700 font-medium rounded-xl px-6 py-2 transition-all duration-200"
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

        {/* Floating elements for visual appeal */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-60 animate-bounce delay-500"></div>
      </div>
    </AuthWrapper>
  );
}
