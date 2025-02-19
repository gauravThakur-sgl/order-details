import { z } from "zod";

export const consignorDetailSchema = z.object({
  pickupAddress: z.string().nonempty("The pickup address is required."),
});
export const orderSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required.")
    .regex(/^[A-Za-z]+$/i, "Please enter alphabetic characters"),
  lastName: z
    .string()
    .nonempty("Last name is required.")
    .regex(/^[A-Za-z]+$/i, "Please enter alphabetic characters"),
  mobileNumber: z
    .string()
    .nonempty("Mobile number is required.")
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^[0-9]+$/, "Please enter numeric characters"),
  alternateMobileNumber: z.string(),

  email: z.string().nonempty("Please entetr a valid email address").email("Invalid email address"),
  country: z.string().nonempty("Country is required."),
  landMark: z.string(),
  address1: z.string().nonempty("Address 1 is required"),
  address2: z.string().nonempty("Address 2 is required"),
  shippingcity: z.string().nonempty("City is required."),
  shippingPincode: z
    .string()
    .nonempty("The customer shipping postcode is required.")
    .regex(/^(?! )[A-Z0-9 ]*(?<! )$/, "Invalid Pincode"),
  shippingState: z.string().nonempty("State is required."),

  isChecked: z.boolean().optional(),

  // Buyer Billing Details
  billingfirstName: z
    .string()
    .nonempty("First name is required.")
    .regex(/^[A-Za-z]+$/i, "Please enter alphabetic characters"),
  billinglastName: z
    .string()
    .nonempty("Last name is required.")
    .regex(/^[A-Za-z]+$/i, "Please enter alphabetic characters"),
  billingmobileNumber: z.coerce
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
  billingPincode: z.coerce
    .string()
    .nonempty("The customer shipping postcode is required.")
    .min(6, "Pincode must be of 6 digit"),
  billingState: z.string().nonempty("The customer shipping state is required."),
});

const iteamArray = z.object({
  // Items Details
  productName: z.string().nonempty("The product name is required."),
  sku: z.coerce.string().optional(),
  hsn: z.coerce
    .string()
    .min(1, { message: "HSN is required" })
    .regex(/^\d{4,8}$/, "HSN must be between 4 and 8 digits"),
  unitPrice: z.coerce
    .string()
    .min(1, { message: "Product price is required" })
    .regex(/^\d+(\.\d{1,2})?$/, "Unit price must be a valid number with up to two decimal places"),
  igst: z.coerce.string().optional(),
  qty: z.coerce
    .string()
    .min(1, { message: "Quantity is required" })
    .regex(/^\d+(\.\d+)?$/, "Quantity must be a valid number"),
});

export const orderDetailsSchema = z.object({
  // ShipMent Details
  actualWeight: z.coerce
    .string()
    .nonempty("The actual weight is required.")
    // .regex(/^[1-9]+$/, "Weight must be atleast 0.1 KG")
    .regex(
      /^(?:0\.[1-9][0-9]*|[1-9]?[0-9]{1,2}|1[0-9]{2}|200|2[0-9]{2}|300)$/,
      "Weight must be between 0.1 and 300 KG",
    ),

  length: z.coerce
    .string()
    .nonempty("The length is required.")
    .regex(/^(?:[1-9]|[1-9][0-9]|1[01][0-9]|120)$/, "Dimension must be between 1 and 120 cm"),

  breadth: z.coerce
    .string()
    .nonempty("The breadth is required.")
    .regex(/^(?:[1-9]|[1-9][0-9]|1[01][0-9]|120)$/, "Dimension must be between 1 and 120 cm"),

  height: z.coerce
    .string()
    .nonempty("The height is required.")
    .regex(/^(?:[1-9]|[1-9][0-9]|1[01][0-9]|120)$/, "Dimension must be between 1 and 120 cm"),

  // Order Details
  invoiceNo: z.string().nonempty("The invoice value is required."),
  invoiceDate: z.string().nonempty("The invoice date is required."),
  invoiceCurrency: z.string().nonempty("The invoice currency is required."),
  orderid: z.string().nonempty("The order id is required."),
  iossNumber: z.coerce.string().optional(),
  items: z.array(iteamArray),
});
