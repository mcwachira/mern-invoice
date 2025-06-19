import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { FaSignInAlt } from "react-icons/fa";
import AuthWrapper from "@/components/AuthWrapper";
import Link from "next/link";
import SignInForm from "@/components/SignInPage";

const LoginPage = () => {
  return (
    <AuthWrapper>
      <Card className="max-w-xl mx-auto border-2 border-gray-200 rounded-3xl p-6">
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-3">
            <FaSignInAlt className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-semibold text-gray-800">Log In</h1>
          </div>

          <Separator />

          {/* Login form */}
          <SignInForm />

          {/* OR sign in with Google */}
          <div className="flex items-center gap-4 my-4">
            <Separator className="flex-grow" />
            <span className="text-gray-500 text-sm">OR LOG IN WITH GOOGLE</span>
            <Separator className="flex-grow" />
          </div>

          <div className="flex justify-center">{/* <GoogleLogin /> */}</div>

          <Separator />

          {/* Sign Up link */}
          <div className="text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-purple-600 hover:underline font-medium"
            >
              Sign Up Here
            </Link>
          </div>

          <Separator />

          {/* Resend verification email */}
          <div className="text-center text-sm text-gray-700">
            Didn’t get the verification email?{" "}
            <Link
              href="/resend"
              className="text-purple-600 hover:underline font-medium"
            >
              Resend Email
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthWrapper>
  );
};

export default LoginPage;
