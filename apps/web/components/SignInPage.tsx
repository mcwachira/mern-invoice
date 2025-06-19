"use client";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";
import { toast } from "sonner";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EyeOff, Eye, User, Mail, Lock, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useLoginUserMutation } from "@/features/auth/authApiSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Spinner from "./Spinner";
import AuthButtonAnimation from "@/animations/authButtonAAnimations";
import { logIn } from "@/features/auth/authSlice";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event?.preventDefault();
  };

  const [loginUser, { data, isLoading, isSuccess }] = useLoginUserMutation();

  useEffect(() => {
    if (isSuccess) {
      router.push("/dashboard");
      toast.success("Login Succsesfull! 🎉");
    }
  }, [data, isSuccess, router]);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginFormData) => {
    try {
      const getUserCredentials = await loginUser(data).unwrap();
      console.log(getUserCredentials);
      dispatch(logIn({ ...getUserCredentials }));
    } catch (error: any) {
      const message =
        error.data.message || "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-500" />
                Email Address
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className={`pl-12 pr-4 py-3 border-2 text-black bg-white rounded-xl transition-all duration-300 ${
                      focusedField === "email"
                        ? "border-purple-500 shadow-lg shadow-purple-500/20 bg-purple-50/50"
                        : "border-gray-200 hover:border-purple-300"
                    } ${form.formState.errors.email ? "border-red-500" : ""}`}
                    onFocus={() => setFocusedField("email")}
                    {...field}
                  />
                  <Mail
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                      focusedField === "email"
                        ? "text-purple-500"
                        : "text-gray-400"
                    }`}
                  />
                  {field.value && !form.formState.errors.email && (
                    <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-500" />
                Password
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={`pl-12 pr-16 py-3 border-2 text-black bg-white rounded-xl transition-all duration-300 ${
                      focusedField === "password"
                        ? "border-purple-500 shadow-lg shadow-purple-500/20 bg-purple-50/50"
                        : "border-gray-200 hover:border-purple-300"
                    } ${form.formState.errors.password ? "border-red-500" : ""}`}
                    onFocus={() => setFocusedField("password")}
                    {...field}
                  />
                  <Lock
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                      focusedField === "password"
                        ? "text-purple-500"
                        : "text-gray-400"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleShowHidePassword}
                    onMouseDown={handleMouseDownPassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />

        {/* Enhanced Submit Button */}
        <div className="pt-4">
          {/* Forgot Password */}
          <div className="flex justify-center items-center mt-4 mb-4">
            <p className="text-sm text-gray-700">
              Forgot Password?{" "}
              <Link
                href="/reset_password_request"
                className="text-purple-600 hover:underline font-medium"
              >
                Click Here to Reset it
              </Link>
            </p>
          </div>
          <AuthButtonAnimation>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Loging In...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Login
                </div>
              )}
            </Button>
          </AuthButtonAnimation>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
