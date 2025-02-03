import { z } from "zod";

export const orderSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .regex(/^[A-Za-z]+$/i, "Please enter alphabetic characters"),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .regex(/^[A-Za-z]+$/i, "Please enter alphabetic characters"),
  mobileNumber: z
    .string()
    .nonempty("Mobile number is required")
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^[0-9]+$/, "Please enter numeric characters"),
  alternateMobileNumber: z.string(),

  email: z.string().nonempty("Email is required").email("Invalid email address"),
  shippingAddress2: z.string().nonempty("Address 2 is required"),
  shippingcity: z.string().nonempty("City is required"),
  shippingPincode: z.string().nonempty("Pincode is required").min(6, "Pincode must be of 6 digit"),
});
