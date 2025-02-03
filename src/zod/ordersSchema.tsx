import { z } from "zod";

export const orderSchema = z.object({
  pickupAddress: z.string().nonempty("The pickup address is required."),
  firstName: z
    .string()
    .nonempty("The customer shipping first name is required.")
    .regex(/^[A-Za-z]+$/i, "Please enter alphabetic characters"),
  lastName: z
    .string()
    .nonempty("The customer shipping last name is required.")
    .regex(/^[A-Za-z]+$/i, "Please enter alphabetic characters"),
  mobileNumber: z
    .string()
    .nonempty("The customer mobile number is required.")
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^[0-9]+$/, "Please enter numeric characters"),
  alternateMobileNumber: z.string(),

  email: z.string().nonempty("Email is required").email("Invalid email address"),
  country: z.string().nonempty("The customer shipping address 1 is required."),
  address1: z.string().nonempty("Address 1 is required"),
  address2: z.string().nonempty("Address 2 is required"),
  shippingcity: z.string().nonempty("The customer shipping city is required."),
  shippingPincode: z
    .string()
    .nonempty("The customer shipping postcode is required.")
    .min(6, "Pincode must be of 6 digit"),
  shippingState: z.string().nonempty("The customer shipping state is required."),
});

export const orderDetailsSchema = z.object({
  // ShipMent Details
  actualWeight: z
    .string()
    .nonempty("The actual weight is required.")
    .regex(/^[0-9]+$/, "Please enter numeric characters"),
  length: z
    .string()
    .nonempty("The length is required.")
    .regex(/^[0-9]+$/, "Please enter numeric characters"),
  breadth: z
    .string()
    .nonempty("The breadth is required.")
    .regex(/^[0-9]+$/, "Please enter numeric characters"),
  height: z
    .string()
    .nonempty("The height is required.")
    .regex(/ ^[0 - 9] + $ /, "Please enter numeric characters"),

  // Order Details
  invoiceNo: z.string().nonempty("The invoice value is required."),
  invoiceDate: z.string().nonempty("The invoice date is required."),
  invoiceCurrency: z.string().nonempty("The invoice currency is required."),
  orderid: z.string().nonempty("The order id is required."),

  // Items Details
  productName: z.string().nonempty("The product name is required."),
  sku: z.string().nonempty("The sku is required."),
  hsn: z.string().nonempty("The hsn is required."),
  unitPrice: z.string().nonempty("The unit price is required."),
  igst: z.string().nonempty("The igst is required."),
  qty: z.string().nonempty("The qty is required."),
});
