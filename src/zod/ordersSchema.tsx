import { z } from "zod";

export const orderSchema = z.object({
  pickupAddress: z.string().nonempty("The pickup address is required."),
  firstName: z
    .string()
    .nonempty("The customer first name is required.")
    .regex(/^[A-Za-z]+$/i, "Please enter alphabetic characters"),
  lastName: z
    .string()
    .nonempty("The customer last name is required.")
    .regex(/^[A-Za-z]+$/i, "Please enter alphabetic characters"),
  mobileNumber: z
    .string()
    .nonempty("The customer mobile number is required.")
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^[0-9]+$/, "Please enter numeric characters"),
  alternateMobileNumber: z.string(),

  email: z.string().nonempty("Email is required").email("Invalid email address"),
  country: z.string().nonempty("The customer shipping country is required."),
  landMark: z.string(),
  address1: z.string().nonempty("Address 1 is required"),
  address2: z.string().nonempty("Address 2 is required"),
  shippingcity: z.string().nonempty("The customer shipping city is required."),
  shippingPincode: z.string().nonempty("The customer shipping postcode is required."),
  shippingState: z.string().nonempty("The customer shipping state is required."),

  isChecked: z.boolean().optional(),

  // Buyer Billing Details
  billingfirstName: z
    .string()
    .nonempty("The customer shipping first name is required.")
    .regex(/^[A-Za-z]+$/i, "Please enter alphabetic characters"),
  billinglastName: z
    .string()
    .nonempty("The customer shipping last name is required.")
    .regex(/^[A-Za-z]+$/i, "Please enter alphabetic characters"),
  billingmobileNumber: z
    .string()
    .nonempty("The customer mobile number is required.")
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^[0-9]+$/, "Please enter numeric characters"),
  billingCountry: z.string().nonempty("The customer shipping address 1 is required."),
  billingAddress1: z.string().nonempty("Address 1 is required"),
  billingLandMark: z.string(),
  billingAddress2: z.string().nonempty("Address 2 is required"),
  billingcity: z.string().nonempty("The customer shipping city is required."),
  billingPincode: z
    .string()
    .nonempty("The customer shipping postcode is required.")
    .min(6, "Pincode must be of 6 digit"),
  billingState: z.string().nonempty("The customer shipping state is required."),
});
{
  /* 
  // Buyer Billing Details
  billingfirstName: z
    .string()
    .nonempty("The customer shipping first name is required.")
    .regex(/^[A-Za-z]+$/i, "Please enter alphabetic characters"),
  billinglastName: z
    .string()
    .nonempty("The customer shipping last name is required.")
    .regex(/^[A-Za-z]+$/i, "Please enter alphabetic characters"),
  billingmobileNumber: z
    .string()
    .nonempty("The customer mobile number is required.")
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^[0-9]+$/, "Please enter numeric characters"),
  billingCountry: z.string().nonempty("The customer shipping address 1 is required."),
  billingAddress1: z.string().nonempty("Address 1 is required"),
  billingAddress2: z.string().nonempty("Address 2 is required"),
  billingcity: z.string().nonempty("The customer shipping city is required."),
  billingPincode: z
    .string()
    .nonempty("The customer shipping postcode is required.")
    .min(6, "Pincode must be of 6 digit"),
  billingState: z.string().nonempty("The customer shipping state is required."),
  */
}

const iteamArray = z.object({
  // Items Details
  productName: z.string().nonempty("The product name is required."),
  sku: z.string().optional(),
  hsn: z
    .string()
    .min(1, { message: "HSN is required" })
    .regex(/^\d{4,8}$/, "HSN must be between 4 and 8 digits"),
  unitPrice: z
    .string()
    .min(1, { message: "Unit price is required" })
    .regex(/^\d+(\.\d{1,2})?$/, "Unit price must be a valid number with up to two decimal places"),
  igst: z
    .string()
    .min(1, { message: "IGST is required" })
    .regex(/^\d+(\.\d{1,2})?$/, "IGST must be a valid percentage or number with up to two decimal places"),
  qty: z
    .string()
    .min(1, { message: "Quantity is required" })
    .regex(/^\d+(\.\d+)?$/, "Quantity must be a valid number"),
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
  height: z.string().nonempty("The height is required."),

  // Order Details
  invoiceNo: z.string().nonempty("The invoice value is required."),
  invoiceDate: z.string().nonempty("The invoice date is required."),
  invoiceCurrency: z.string().nonempty("The invoice currency is required."),
  orderid: z.string().nonempty("The order id is required."),
  items: z.array(iteamArray),
});
