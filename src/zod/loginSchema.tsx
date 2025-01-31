import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty({ message: "Email cannot be empty" }).email({ message: "Invalid email address" }),
  password: z
    .string()
    .nonempty({ message: "password cannot be empty" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty({ message: "Password cannot be empty" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" }),
    confirm: z.string().nonempty({ message: "Password cannot be empty" }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password don't match",
    path: ["confirm"],
  });

export const signupSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Name cannot be empty" })
      .min(3, { message: "Name must be at least 3 characters long" }),
    phone: z
      .string()
      .nonempty({ message: "Phone cannot be empty" })
      .max(10, { message: "Phone number must be at most 10 characters long" }),
    email: z
      .string()
      .nonempty({ message: "Email cannot be empty" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .nonempty({ message: "Password cannot be empty" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" })
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      }),
    confirm: z.string().nonempty({ message: "Password cannot be empty" }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password don't match",
    path: ["confirm"],
  });
