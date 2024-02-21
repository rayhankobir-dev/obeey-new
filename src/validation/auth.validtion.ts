import * as z from "zod";
import * as Yup from "yup";

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

export const imageSchema = Yup.object().shape({
  fieldname: Yup.string().required(),
  originalname: Yup.string().required(),
  encoding: Yup.string(),
  mimetype: Yup.string()
    .oneOf(["image/jpeg", "image/png", "image/gif"])
    .required(),
  destination: Yup.string().required(),
  filename: Yup.string().required(),
  path: Yup.string().required(),
  size: Yup.number().required(),
});

export const audioSchema = Yup.object().shape({
  fieldname: Yup.string().required(),
  originalname: Yup.string().required(),
  encoding: Yup.string(),
  mimetype: Yup.string()
    .oneOf(["audio/mpeg", "audio/wav", "audio/mp3"])
    .required(),
  destination: Yup.string().required(),
  filename: Yup.string().required(),
  path: Yup.string().required(),
  size: Yup.number().required(),
});

export const podcastSchema = {
  thumbnail: z
    .any()
    .refine((files) => files?.[0]?.size <= 500000000, `Max image size is 5MB.`)
    .refine(
      (files) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          files?.[0]?.type
        ),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  audio: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= 50000000000000,
      `Max image size is 25MB.`
    )
    .refine(
      (files) =>
        ["audio/mpeg", "audio/wav", "audio/mp3"].includes(files?.[0]?.type),
      "Only .mpeg, .wav, .mp3 formats are supported."
    ),
};
