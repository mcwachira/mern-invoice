import * as z from "zod";
export type FormState =
  | {
      error?: {
        name?: string;
        email?: string;
        password?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be atleast 8 characters long"),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full Name is required")
      .min(3, "Nmae must be atleast 3 characters long")
      .max(50, "Name must be less than 50 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please eneter a valid email"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 8 characters long")
      .max(100, "Password must be less than than 100 characters"),

    confirmPassword: z.string().min(1, "please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
