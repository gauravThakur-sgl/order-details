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
  country: z.string().nonempty("Please select a country"),
  landMark: z.string(),
  address1: z.string().nonempty("Address 1 is required"),
  address2: z.string().nonempty("Address 2 is required"),
  shippingcity: z.string().nonempty("City is required."),
  shippingPincode: z
    .string()
    .nonempty("The customer shipping postcode is required.")
    .regex(/^[A-Z0-9]+(?: [A-Z0-9]+)?$/, "Invalid Pincode"),

  shippingState: z.string().nonempty("Please select a state"),

  isChecked: z.boolean().optional(),

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
  billingCountry: z.string().nonempty("Please select a country"),
  billingAddress1: z.string().nonempty("Address 1 is required"),
  billingLandMark: z.string(),
  billingAddress2: z.string().nonempty("Address 2 is required"),
  billingcity: z.string().nonempty("The customer shipping city is required."),
  billingPincode: z.coerce
    .string()
    .nonempty("The customer shipping postcode is required.")
    .regex(/^[A-Z0-9]+(?: [A-Z0-9]+)?$/, "Invalid Pincode"),
  billingState: z.string().nonempty("Please select a state"),
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
    .regex(/^(?!0$)\d+$/, "Unit Price must not be Zero")
    .regex(/^\d+(\.\d{1,2})?$/, "Unit price must be a valid number with up to two decimal places"),
  igst: z.coerce.string().optional(),
  qty: z.coerce
    .string()
    .regex(/^(?!0$)\d+$/, "Quantity must not be Zero")
    .regex(/^\d+$/, "Quantity must be an integer"),
});

export const orderDetailsSchema = z.object({
  // ShipMent Details
  actualWeight: z.coerce
    .string()
    .nonempty("Weight must be at least 0.01 KG.")
    .refine((val) => parseFloat(val) >= 0.01, "Weight must be at least 0.01 KG.")
    .refine((val) => parseFloat(val) <= 300, {
      message: "Weight must not be more than 300 KG",
    }),

  length: z.coerce
    .string()
    .nonempty("Length must be atleast 1 cm.")
    .regex(/^(?:[1-9]|[1-9][0-9]|1[01][0-9]|120)$/, "Length must not be more than 120 cm"),

  breadth: z.coerce
    .string()
    .nonempty("Breaddth must be atleast 1 cm.")
    .regex(/^(?:[1-9]|[1-9][0-9]|1[01][0-9]|120)$/, "Breadth must not be more than 120 cm"),

  height: z.coerce
    .string()
    .nonempty("Height must be atleast 1 cm.")
    .regex(/^(?:[1-9]|[1-9][0-9]|1[01][0-9]|120)$/, "Height must not be more than 120 cm"),

  // Order Details
  invoiceNo: z.string().nonempty("The invoice value is required."),
  invoiceDate: z.string().nonempty("The invoice date is required."),
  invoiceCurrency: z.string().nonempty("The invoice currency is required."),
  orderid: z.string().optional(),
  iossNumber: z.coerce.string().optional(),
  items: z.array(iteamArray),
});
