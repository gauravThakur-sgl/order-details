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
