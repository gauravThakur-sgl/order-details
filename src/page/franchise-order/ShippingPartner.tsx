import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface IShippingPartnerProps {
  data: {
    consigneeDetail: {
      shippingPincode: string;
      countryCode: string;
    };
  };
  onNext: (formData: FormData) => void;
}
interface ShippingRate {
  provider_code: string;
  display_name: string;
  helper_text: string;
  image: string;
  transit_time: string;
  rate: number;
  bill_weight_kg: number;
}
export const ShippingPartner = ({ data }: IShippingPartnerProps) => {
  const [shippingPartner, setShippingPartner] = useState<ShippingRate[]>([]);

  useEffect(() => {
    const getShippingRate = async () => {
      try {
        // const consigneeDetail = data.consigneeDetail;
        const payload = {
          customer_shipping_postcode: "87654321",
          customer_shipping_country_code: "AU",
          package_weight: 15,
          package_length: 16,
          package_breadth: 53,
          package_height: 92,
        };
        const res = await axios.post("https://api.fr.stg.shipglobal.in/api/v1/orders/get-shipper-rates", payload, {
          headers: {
            Authorization:
              "eyJ0eXAiOiJKV1QiLCeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnRpdHlJZCI6MzAwNjcsImNyZWF0ZWRfYXQiOnsiZGF0ZSI6IjIwMjUtMDItMTEgMTI6MjA6NDIuODQ0NjI1IiwidGltZXpvbmVfdHlwZSI6MywidGltZXpvbmUiOiJBc2lhL0tvbGthdGEifSwiZXhwaXJlc19hdCI6eyJkYXRlIjoiMjAyNS0wMy0xMyAxMjoyMDo0Mi44NDQ2MjgiLCJ0aW1lem9uZV90eXBlIjozLCJ0aW1lem9uZSI6IkFzaWEvS29sa2F0YSJ9LCJpZCI6ImUyY2QxMzNmLWQ3NjEtNDQ1Ni05MWZmLTUwYjM4MWFkNWY1ZSIsInJlbW90ZV9lbnRpdHlfaWQiOjB9.entPw4bJC4KDSaS2_ObCHAMm28En5vxtlLAIDV5WZrMJhbGciOiJIUzI1NiJ9.eyJlbnRpdHlJZCI6MzAwNjcsImNyZWF0ZWRfYXQiOnsiZGF0ZSI6IjIwMjUtMDItMTEgMTI6MjA6NDIuODQ0NjI1IiwidGltZXpvbmVfdHlwZSI6MywidGltZXpvbmUiOiJBc2lhL0tvbGthdGEifSwiZXhwaXJlc19hdCI6eyJkYXRlIjoiMjAyNS0wMy0xMyAxMjoyMDo0Mi44NDQ2MjgiLCJ0aW1lem9uZV90eXBlIjozLCJ0aW1lem9uZSI6IkFzaWEvS29sa2F0YSJ9LCJpZCI6ImUyY2QxMzNmLWQ3NjEtNDQ1Ni05MWZmLTUwYjM4MWFkNWY1ZSIsInJlbW90ZV9lbnRpdHlfaWQiOjB9.entPw4bJC4KDSaS2_ObCHAMm28En5vxtlLAIDV5WZrM",
          },
        });
        setShippingPartner(res.data.data);
      } catch (error) {
        console.error("Error fetching shipping rate:", error);
      }
    };
    getShippingRate();
  }, [data]);
  console.log(shippingPartner, "shippingPartner");
  return (
    <div>
      <div>
        <p className="text-franchise-sectionp text-sm">
          All shipments via ShipGlobal services are <span className="font-bold">Delivered Duty Paid (DDP)</span>, hence{" "}
          <span className="font-bold">no extra duty</span> will be billed on the consignee or the shipper. Rates are
          inclusive of covid & fuel surcharge, exclusive of GST and ex-Delhi Hub.
        </p>
        <p className="pt-5">
          In case any doubt, please call/whatsapp at{" "}
          <a href="" className="text-franchise-primary font-semibold">
            011-422 77777
          </a>
        </p>
        <div className="flex justify-center items-center gap-4 text-franchise-sectionp mt-5 px-12">
          <div className="flex flex-col justify-center items-center border rounded-md bg-white py-2 px-5">
            <p>1 KG</p>
            <p className="text-sm">Dead Weight</p>
          </div>
          <div className="flex flex-col justify-center items-center border rounded-md bg-white py-2 px-5">
            <p>1 KG</p>
            <p className="text-sm">Dead Weight</p>
          </div>
          <div className="flex flex-col justify-center items-center border border-orange-600 rounded-md bg-franchise-weight-bg text-franchise-weight-text py-2 px-5">
            <p>1 KG</p>
            <p className="text-sm">Billed Weight</p>
          </div>
        </div>

        <div className="text-sm font-semibold">
          <p>Showing 1 Results</p>
        </div>
        <div className="flex flex-col justify-center mt-5">
          <table className="border-seperate border-spacing-2 border">
            <thead>
              <tr className="bg-gray-50 text-gray-500">
                <th className="font-thin p-2 rounded-l-lg text-left pl-4">Courier Partner</th>
                <th className="font-thin text-left">Delivery Time</th>
                <th className="font-thin text-left">Shipment Rate</th>
                <th className="font-thin p-2 rounded-r-lg">Select</th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="border">
                <td className="pl-4 py-2">Ups</td>
                <td>4-7</td>
                <td>Rs.159044</td>
                <td>
                  <CheckCircle />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end py-6">
          <button
            type="submit"
            className="text-franchise-button-text bg-franchise-primary rounded-md p-1 px-4 font-medium text-lg"
          >
            Pay and Order
          </button>
        </div>
      </div>
    </div>
  );
};
