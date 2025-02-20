import apiClient from "../api/apiClient";
import { ShipmentInformationData } from "../interface";

export const getRate = async (
  shippingPincode: string,
  country: string,
  currentActualWeight: string,
  currentLength: string,
  currentBreadth: string,
  currentHeight: string,
) => {
  //   const currentActualWeight = watch("actualWeight");
  //   const currentLength = watch("length");
  //   const currentBreadth = watch("breadth");
  //   const currentHeight = watch("height");
  const ratePayload = {
    customer_shipping_postcode: shippingPincode,
    customer_shipping_country_code: country,
    package_weight: currentActualWeight,
    package_length: currentLength,
    package_breadth: currentBreadth,
    package_height: currentHeight,
  };
  try {
    const response = await apiClient.post("/orders/get-shipper-rates", ratePayload);
    console.log(response.data, "Shipper Rates Response");
    localStorage.setItem("shipperRates", JSON.stringify(response.data.data));
    window.dispatchEvent(new Event("storage"));
    console.log(response.data, "rate from response");
  } catch (error) {
    console.error("Error in getting Shipper Rate:", error);
  }
};

export const validateData = async (
  data: ShipmentInformationData,
  setResError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const validatePayload = {
    csbv: "0",
    currency_code: data.invoiceCurrency,
    package_weight: data.actualWeight,
    package_height: data.height,
    package_length: data.length,
    package_breadth: data.breadth,
    vendor_order_item: data.items.map((item) => ({
      vendor_order_item_name: item.productName,
      vendor_order_item_sku: item.sku,
      vendor_order_item_quantity: item.qty,
      vendor_order_item_unit_price: item.unitPrice,
      vendor_order_item_hsn: item.hsn,
      vendor_order_item_tax_rate: item.igst,
    })),
  };
  try {
    const response = await apiClient.post("/orders/validate-order-invoice", validatePayload);
    setResError(null);
    console.log(response.data, "Validation successful.");
    return true;
  } catch (error) {
    setResError(String(error.response?.data?.message || "Validation error."));
    console.error("Error validating order invoice:", error);
    return false;
  }
};
