import { z } from "zod";
import { consignorDetailSchema, orderDetailsSchema, orderSchema } from "../zod/franchiseOrderSchema";

export type ConsignorData = z.infer<typeof consignorDetailSchema>;
export type FormData = z.infer<typeof orderSchema>;
export type OrderDetailsFormData = z.infer<typeof orderDetailsSchema>;
export type ShippingPartnerFormData = { shippingPartner: string; est: string; price: string };

export type ShipmentInformationData = z.infer<typeof orderDetailsSchema> & {
  shippingPincode: string;
  country: string;
};

export interface ShippingRate {
  provider_code: string;
  display_name: string;
  helper_text: string;
  image: string;
  transit_time: string;
  rate: number;
  bill_weight_kg: number;
}

export interface IShippingPartnerProps {
  data: {
    consigneeDetail: {
      shippingPincode: string;
      country: string;
      shippingPincodee: string;
    };
    shipmentInformation: {
      actualWeight: number;
      length: number;
      height: number;
      breadth: number;
    };
  };
  onNext: (formData: FormData) => void;
}

export interface DataAccordionProps {
  title: string;
  data: {
    firstName?: string;
    lastName?: string;
    mobileNumber?: string;
    email?: string;
    pickupAddress?: string;
    billingAddress1?: string;
    billingAddress2?: string;
    landMark?: string;
    shippingcity?: string;
    country?: string;
    shippingState?: string;
    shippingPincode?: string;
    billingcity?: string;
    billingCountry?: string;
    billingState?: string;
    billingPincode?: string;
    billingLandMark?: string;
    address1?: string;
    address2?: string;
    actualWeight?: string;
    length?: string;
    breadth?: string;
    height?: string;
    invoiceNo?: string;
    shippingPartner?: string;
    est?: string;
    price?: string;
    unit?: string;
    qty?: string;
    total?: string;
    productName?: string;
    hsn: string;
    sku: string;
    items: {
      productName: string;
      hsn: string;
      sku: string;
      qty: string;
      unitPrice: string;
    }[];
  };
  initialIsOpen?: boolean;
}
