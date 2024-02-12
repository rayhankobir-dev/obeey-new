import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export const registerFormSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password is required." }),
});

export const otpFormSchema = z.object({
  otp: z
    .string()
    .length(4, { message: "OTP must be exactly 4 digits long." })
    .regex(/^\d{4}$/, { message: "OTP must consist of 4 digits." }),
});
