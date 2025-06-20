"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutgoingMail } from "react-icons/md";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import Spinner from "@/components/Spinner";
import AuthWrapper from "@/components/AuthWrapper";

import {
  EmailVerificationFormData,
  emailVerificationSchema,
} from "@/lib/validations/auth";
import { useResendVerifyEmailMutation } from "@/features/auth/authApiSlice";

const ResendEmailTokenPage = () => {
  const [focusedField, setFocusedField] = useState("");

  const router = useRouter();
  const goBack = () => router.back();

  const [resendVerifyEmail, { data, isLoading, isSuccess }] =
    useResendVerifyEmailMutation();

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
      toast.success(data.message);
    }
  }, [data, isSuccess, router]);

  const form = useForm<EmailVerificationFormData>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: EmailVerificationFormData) => {
    try {
      await resendVerifyEmail(data).unwrap();
    } catch (error: any) {
      const message =
        error.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-700 border-t-teal-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-teal-400/5 to-emerald-400/5 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl shadow-black/20"
          >
            {/* Header */}
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-teal-500 to-emerald-500 p-4 rounded-full">
                  <MdOutgoingMail className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  Resend Verification
                </h1>
                <p className="text-slate-400 text-sm">
                  Enter your email to receive a new verification link
                </p>
              </div>
            </div>

            {/* Decorative separator */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
              <Mail className="w-4 h-4 text-teal-500" />
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
            </div>

            {/* Email Field */}
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-teal-500" />
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          className={`pl-12 pr-12 py-4 border-2 bg-slate-900/50 text-white placeholder:text-slate-500 rounded-xl transition-all duration-300 backdrop-blur-sm ${
                            focusedField === "email"
                              ? "border-teal-500 shadow-lg shadow-teal-500/20 bg-slate-900/70"
                              : "border-slate-600 hover:border-slate-500"
                          } ${
                            form.formState.errors.email ? "border-red-500" : ""
                          }`}
                          onFocus={() => setFocusedField("email")}
                          {...field}
                        />
                        <Mail
                          className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                            focusedField === "email"
                              ? "text-teal-500"
                              : "text-slate-500"
                          }`}
                        />
                        {field.value && !form.formState.errors.email && (
                          <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {form.formState.isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <MdOutgoingMail className="w-4 h-4" />
                    Resend Verification Email
                  </div>
                )}
              </Button>

              {/* Go Back Button */}
              <Button
                type="button"
                variant="outline"
                onClick={goBack}
                className="w-full h-12 border-2 border-slate-600 hover:border-slate-500 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white font-medium rounded-xl transition-all duration-200 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </div>
              </Button>
            </div>
          </form>
        </Form>

        {/* Floating elements for visual appeal */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full opacity-60 animate-bounce delay-500"></div>
      </div>
    </div>
  );
};

export default ResendEmailTokenPage;
