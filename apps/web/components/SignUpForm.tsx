"use client";
import { SignUpFormData, signUpSchema } from "@/lib/validations/auth";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { EyeOff, Eye } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { strengthColor, strengthIndicator } from "@/lib/password-strength";
import { useRegisterUserMutation } from "@/features/auth/authApiSlice";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

const SignUpForm = () => {
  const [level, setLevel] = useState(0);
  const [strength, setStrength] = useState({ label: "", color: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      const message = data?.message;
      toast.success(message);
    }
  }, [data, isSuccess, router]);
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: SignUpFormData) => {
    console.log(data);

    try {
      await registerUser(data).unwrap();
      //create  formData for server action
      // Create FormData for server action
      // const formData = new FormData();
      // formData.append("name", data.name);
      // formData.append("email", data.email);
      // formData.append("password", data.password);
      // formData.append("confirmPassword", data.confirmPassword);
    } catch (error: any) {
      const message = error.data.message;
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Sign Up Page
          </CardDescription>
        </CardHeader>
        {isLoading ? (
          <Spinner />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-2"></div>

              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e); // Update form state
                              changePassword(e.target.value); // Update strength indicator
                            }}
                          />
                          <button
                            type="button"
                            onClick={handleShowHidePassword}
                            onMouseDown={handleMouseDownPassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 bg-blend-hue"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />

                      {/* Password strength bar */}
                      {field.value && (
                        <div className="mt-2">
                          <div
                            className="w-full h-2 rounded-full"
                            style={{ backgroundColor: "#e0e0e0" }}
                          >
                            <div
                              className="h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${(level / 5) * 100}%`,
                                backgroundColor: strength.color,
                              }}
                            />
                          </div>
                          <p
                            className="text-xs mt-1"
                            style={{ color: strength.color }}
                          >
                            Strength: {strength.label}
                          </p>
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={handleShowHideConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 bg-blend-hue"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full mt-5 "
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Creating Account..."
                    : "Create Account"}
                </Button>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/auth/signin"
                    className="text-blue-600 hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default SignUpForm;
