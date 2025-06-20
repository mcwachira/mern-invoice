import * as z from "zod";
export type FormState =
  | {
      error?: {
        name?: string;
        email?: string;
        password?: string[];
        passwordConfirm?: string[];
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
    firstName: z
      .string()
      .min(1, "Full Name is required")
      .min(3, "Nmae must be atleast 3 characters long")
      .max(50, "Name must be less than 50 characters"),

    lastName: z
      .string()
      .min(1, "Full Name is required")
      .min(3, "Nmae must be atleast 3 characters long")
      .max(50, "Name must be less than 50 characters"),
    username: z
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

    passwordConfirm: z.string().min(1, "please confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Password don't match",
    path: ["passwordConfirm"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export const emailVerificationSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export const emailPasswordResetSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});
export const passwordResetSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 8 characters long")
      .max(100, "Password must be less than than 100 characters"),

    passwordConfirm: z.string().min(1, "please confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Password don't match",
    path: ["passwordConfirm"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type EmailVerificationFormData = z.infer<typeof emailVerificationSchema>;
export type EmailPasswordResetFormData = z.infer<
  typeof emailPasswordResetSchema
>;
export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;
