"use client";
import { SignUpFormData, signUpSchema } from "@/lib/validations/auth";
import { toast } from "sonner";
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
import {
  EyeOff,
  Eye,
  User,
  Mail,
  Lock,
  Shield,
  CheckCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { strengthColor, strengthIndicator } from "@/lib/password-strength";
import { useRegisterUserMutation } from "@/features/auth/authApiSlice";
import { useRouter } from "next/navigation";

import AuthButtonAnimation from "@/animations/authButtonAAnimations";

const SignUpForm = () => {
  const [level, setLevel] = useState(0);
  const [strength, setStrength] = useState({ label: "", color: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const router = useRouter();

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowHideConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event?.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(temp);
    setStrength(strengthColor(temp));
  };

  useEffect(() => {
    changePassword("");
  }, []);

  const [registerUser, { data, isLoading, isSuccess }] =
    useRegisterUserMutation();

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
      toast.success("Account created successfully! Welcome aboard! 🎉");
    }
  }, [data, isSuccess, router]);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (data: SignUpFormData) => {
    try {
      await registerUser(data).unwrap();
    } catch (error: any) {
      const message =
        error.data.message || "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  const getStrengthColor = (level: number) => {
    if (level <= 1) return "from-red-500 to-red-600";
    if (level <= 2) return "from-orange-500 to-orange-600";
    if (level <= 3) return "from-yellow-500 to-yellow-600";
    if (level <= 4) return "from-teal-500 to-teal-600";
    return "from-emerald-500 to-emerald-600";
  };

  const getStrengthWidth = (level: number) => {
    return `${(level / 5) * 100}%`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        {/* First Name and Last Name - Side by side on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name Field */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-gray-200 flex items-center gap-2">
                  <User className="w-4 h-4 text-teal-400" />
                  First Name
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder="Enter your first name"
                      className={`pl-12 pr-4 py-3 border-2 text-white bg-slate-800/50 rounded-xl transition-all duration-300 placeholder:text-gray-400 ${
                        focusedField === "firstName"
                          ? "border-teal-500 shadow-lg shadow-teal-500/20 bg-slate-800/70"
                          : "border-slate-600 hover:border-teal-400"
                      } ${form.formState.errors.firstName ? "border-red-500" : ""}`}
                      onFocus={() => setFocusedField("firstName")}
                      {...field}
                    />
                    <User
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                        focusedField === "firstName"
                          ? "text-teal-400"
                          : "text-gray-400"
                      }`}
                    />
                    {field.value && !form.formState.errors.firstName && (
                      <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          {/* Last Name Field */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-gray-200 flex items-center gap-2">
                  <User className="w-4 h-4 text-teal-400" />
                  Last Name
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder="Enter your last name"
                      className={`pl-12 pr-4 py-3 border-2 text-white bg-slate-800/50 rounded-xl transition-all duration-300 placeholder:text-gray-400 ${
                        focusedField === "lastName"
                          ? "border-teal-500 shadow-lg shadow-teal-500/20 bg-slate-800/70"
                          : "border-slate-600 hover:border-teal-400"
                      } ${form.formState.errors.lastName ? "border-red-500" : ""}`}
                      onFocus={() => setFocusedField("lastName")}
                      {...field}
                    />
                    <User
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                        focusedField === "lastName"
                          ? "text-teal-400"
                          : "text-gray-400"
                      }`}
                    />
                    {field.value && !form.formState.errors.lastName && (
                      <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />
        </div>

        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-gray-200 flex items-center gap-2">
                <User className="w-4 h-4 text-teal-400" />
                Username
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    placeholder="Choose a unique username"
                    className={`pl-12 pr-4 py-3 border-2 text-white bg-slate-800/50 rounded-xl transition-all duration-300 placeholder:text-gray-400 ${
                      focusedField === "username"
                        ? "border-teal-500 shadow-lg shadow-teal-500/20 bg-slate-800/70"
                        : "border-slate-600 hover:border-teal-400"
                    } ${form.formState.errors.username ? "border-red-500" : ""}`}
                    onFocus={() => setFocusedField("username")}
                    {...field}
                  />
                  <User
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                      focusedField === "username"
                        ? "text-teal-400"
                        : "text-gray-400"
                    }`}
                  />
                  {field.value && !form.formState.errors.username && (
                    <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-gray-200 flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400" />
                Email Address
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className={`pl-12 pr-4 py-3 border-2 text-white bg-slate-800/50 rounded-xl transition-all duration-300 placeholder:text-gray-400 ${
                      focusedField === "email"
                        ? "border-teal-500 shadow-lg shadow-teal-500/20 bg-slate-800/70"
                        : "border-slate-600 hover:border-teal-400"
                    } ${form.formState.errors.email ? "border-red-500" : ""}`}
                    onFocus={() => setFocusedField("email")}
                    {...field}
                  />
                  <Mail
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                      focusedField === "email"
                        ? "text-teal-400"
                        : "text-gray-400"
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
              <FormLabel className="text-sm font-medium text-gray-200 flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-400" />
                Password
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={`pl-12 pr-16 py-3 border-2 text-white bg-slate-800/50 rounded-xl transition-all duration-300 placeholder:text-gray-400 ${
                      focusedField === "password"
                        ? "border-teal-500 shadow-lg shadow-teal-500/20 bg-slate-800/70"
                        : "border-slate-600 hover:border-teal-400"
                    } ${form.formState.errors.password ? "border-red-500" : ""}`}
                    onFocus={() => setFocusedField("password")}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      changePassword(e.target.value);
                    }}
                  />
                  <Lock
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                      focusedField === "password"
                        ? "text-teal-400"
                        : "text-gray-400"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleShowHidePassword}
                    onMouseDown={handleMouseDownPassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-700/50 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />

              {/* Enhanced Password Strength Indicator */}
              {field.value && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getStrengthColor(level)} transition-all duration-500 ease-out`}
                        style={{
                          width: getStrengthWidth(level),
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-300">
                      {level}/5
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield
                      className="w-3 h-3"
                      style={{ color: strength.color }}
                    />
                    <p
                      className="text-xs font-medium"
                      style={{ color: strength.color }}
                    >
                      Password Strength: {strength.label}
                    </p>
                  </div>
                </div>
              )}
            </FormItem>
          )}
        />

        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-gray-200 flex items-center gap-2">
                <Shield className="w-4 h-4 text-teal-400" />
                Confirm Password
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className={`pl-12 pr-16 py-3 border-2 text-white bg-slate-800/50 rounded-xl transition-all duration-300 placeholder:text-gray-400 ${
                      focusedField === "passwordConfirm"
                        ? "border-teal-500 shadow-lg shadow-teal-500/20 bg-slate-800/70"
                        : "border-slate-600 hover:border-teal-400"
                    } ${form.formState.errors.passwordConfirm ? "border-red-500" : ""}`}
                    onFocus={() => setFocusedField("passwordConfirm")}
                    {...field}
                  />
                  <Shield
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                      focusedField === "passwordConfirm"
                        ? "text-teal-400"
                        : "text-gray-400"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleShowHideConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-700/50 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  {field.value && field.value === form.watch("password") && (
                    <CheckCircle className="absolute right-12 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        {/* Enhanced Submit Button */}
        <div className="pt-4">
          <AuthButtonAnimation>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 hover:from-teal-600 hover:via-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Create Account
                </div>
              )}
            </Button>
          </AuthButtonAnimation>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
