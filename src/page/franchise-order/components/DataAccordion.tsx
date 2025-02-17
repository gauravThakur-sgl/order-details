import { useState } from "react";

interface DataAccordionProps {
  title: string;
  data: {
    firstName?: string;
    lastName?: string;
    mobileNumber?: string;
    email?: string;
    pickupAddress?: string;
    billingAddress1?: string;
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
    HSN: string;
    SKU: string;
  };
}

export const DataAccordion = ({ title, data }: DataAccordionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  // const [country, setCountry] = useState<string | null>(null);
  const countryName = localStorage.getItem("countryName");
  console.log(countryName, "countryName");
  console.log(data.pickupAddress, "pickupAddress");
  const addressData = data.pickupAddress ? JSON.parse(data.pickupAddress) : {};

  const extractRelevantData = (key: string, data: DataAccordionProps["data"]) => {
    switch (key) {
      case "Consignor Detail":
        return {
          name: `${addressData.firstName} ${addressData.lastName}`,
          mobileNumber: addressData.mobileNo,
          email: addressData.email,
          address: addressData.billingAddress,
        };
      case "Consignee Detail":
        return {
          name: `${data.firstName} ${data.lastName}`,
          mobileNumber: data.mobileNumber,
          billingAddress: data.billingAddress1,
          billingLandMark: data.billingLandMark,
          billingCity: data.billingcity,
          billingCountry: data.billingCountry,
          billingState: data.billingState,
          billingPincode: data.billingPincode,
          shippingAddress: data.address1,
          landmark: data.landMark,
          city: data.shippingcity,
          country: data.country,
          state: data.shippingState,
          pincode: data.shippingPincode,
        };
      case "Item Details":
        return {
          weight: data.actualWeight,
          dimensions: `${data.length} x ${data.breadth} x ${data.height}`,
          invoiceNo: data.invoiceNo,
          product: data.productName,
          hsn: data.HSN,
          sku: data.SKU,
          qty: data.qty,
          unit: data.unit,
        };
      case "Select Shipping Partner":
        return {
          partner: data.shippingPartner,
          est: data.est,
          price: data.price,
        };
      default:
        return {};
    }
  };
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const relevantData = extractRelevantData(title, data);
  const isSameAddress = relevantData.billingAddress === relevantData.shippingAddress;
  console.log(relevantData);
  const renderData = () => {
    if (title === "Consignor Detail") {
      return (
        <>
          <div className="space-y-1">
            <h3 className="text-franchise-consignor-text">Name</h3>
            <p className="text-franchise-sectionp font-medium">{`${relevantData.name} | ${relevantData.mobileNumber}`}</p>
            <p className="text-franchise-sectionp">{relevantData.email}</p>
          </div>
          <div className="space-y-1 pt-2">
            <h3 className="text-franchise-consignor-text">Address</h3>
            <p className="text-franchise-sectionp">{relevantData.address}</p>
          </div>
        </>
      );
    } else if (title === "Consignee Detail") {
      return (
        <div className="space-y-2">
          <div className="space-y-1">
            <h3 className="text-franchise-consignor-text">Name</h3>
            <p className="text-franchise-sectionp font-medium">{`${relevantData.name} | ${relevantData.mobileNumber}`}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-franchise-consignor-text">Billing Address</h3>
            <p className="text-franchise-sectionp">
              {isSameAddress
                ? "Same as shipping address"
                : `${relevantData.billingAddress} ${relevantData.billingLandMark} ${relevantData.billingCity} ${relevantData.billingState} ${relevantData.billingCountry} ${relevantData.billingPincode}`}
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-franchise-consignor-text">Shipping Address</h3>
            <p className="text-franchise-sectionp">{`${relevantData.shippingAddress} ${relevantData.landmark} ${relevantData.city} ${relevantData.state} ${countryName} ${relevantData.pincode}`}</p>
          </div>
        </div>
      );
    } else if (title === "Item Details") {
      return (
        <>
          <div className="flex justify-between pr-10">
            <div className="space-y-1">
              <h3 className="text-franchise-consignor-text">Billed Weight</h3>
              <p className="text-franchise-sectionp font-medium">{`${relevantData.weight} KG`}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-franchise-consignor-text">Dimensions</h3>
              <p className="text-franchise-sectionp font-medium">{`${relevantData.dimensions}`}</p>
            </div>
          </div>
          <div className="flex justify-between pr-10 pt-4">
            <div className="space-y-1">
              <h3 className="text-franchise-consignor-text">Product</h3>
              <p className="text-franchise-sectionp font-medium">{`${relevantData.product}`}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-franchise-consignor-text">HSN</h3>
              <p className="text-franchise-sectionp font-medium">{`${relevantData.hsn}`}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-franchise-consignor-text">SKU</h3>
              <p className="text-franchise-sectionp font-medium">{`${relevantData.sku}`}</p>
            </div>
          </div>
          <div className="flex justify-between pr-10 pt-4">
            <div className="space-y-1">
              <h3 className="text-franchise-consignor-text">Qty</h3>
              <p className="text-franchise-sectionp font-medium">{`${relevantData.qty}`}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-franchise-consignor-text">Unit Price</h3>
              <p className="text-franchise-sectionp font-medium">{`${relevantData.unit}`}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-franchise-consignor-text">Total</h3>
              <p className="text-franchise-sectionp font-medium">{`${relevantData}`}</p>
            </div>
          </div>
        </>
      );
    } else if (title === "Select Shipping Partner") {
      return (
        <>
          <h3 className="font-semibold">Shipping Partner</h3>
          <p>{`Partner: ${relevantData.partner}`}</p>
          <p>{`Estimated Time: ${relevantData.est}`}</p>
          <p>{`Price: ${relevantData.price}`}</p>
        </>
      );
    }
  };

  return (
    <div className="border-b border-gray-300 rounded bg-white w-full p-3">
      <h2 className="font-semibold mb-2 text-base" onClick={toggleAccordion}>
        {title}
      </h2>
      {isOpen && <div className="text-sm text-gray-700">{renderData()}</div>}
    </div>
  );
};
