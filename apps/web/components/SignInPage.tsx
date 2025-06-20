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
      toast.success("Login Successful! 🎉");
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
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full animate-pulse"></div>
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
              <FormLabel className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400" />
                Email Address
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className={`pl-12 pr-4 py-3 border-2 text-white bg-slate-800/50 rounded-xl transition-all duration-300 placeholder:text-gray-500 ${
                      focusedField === "email"
                        ? "border-teal-400 shadow-lg shadow-teal-400/20 bg-slate-800/70"
                        : "border-slate-600 hover:border-teal-500"
                    } ${form.formState.errors.email ? "border-red-500" : ""}`}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                    {...field}
                  />
                  <Mail
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                      focusedField === "email"
                        ? "text-teal-400"
                        : "text-gray-500"
                    }`}
                  />
                  {field.value && !form.formState.errors.email && (
                    <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-400" />
                Password
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`pl-12 pr-16 py-3 border-2 text-white bg-slate-800/50 rounded-xl transition-all duration-300 placeholder:text-gray-500 ${
                      focusedField === "password"
                        ? "border-teal-400 shadow-lg shadow-teal-400/20 bg-slate-800/70"
                        : "border-slate-600 hover:border-teal-500"
                    } ${form.formState.errors.password ? "border-red-500" : ""}`}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField("")}
                    {...field}
                  />
                  <Lock
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                      focusedField === "password"
                        ? "text-teal-400"
                        : "text-gray-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleShowHidePassword}
                    onMouseDown={handleMouseDownPassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-700 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400 hover:text-teal-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400 hover:text-teal-400" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        {/* Forgot Password */}
        <div className="flex justify-center items-center">
          <p className="text-sm text-gray-400">
            Forgot Password?{" "}
            <Link
              href="/reset_password_request"
              className="text-teal-400 hover:text-teal-300 hover:underline font-medium transition-colors"
            >
              Reset it here
            </Link>
          </p>
        </div>

        {/* Enhanced Submit Button */}
        <div className="pt-2">
          <AuthButtonAnimation>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Sign In
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
