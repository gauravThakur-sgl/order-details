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
    address1?: string;
    actualWeight?: string;
    length?: string;
    breadth?: string;
    height?: string;
    invoiceNo?: string;
    shippingPartner?: string;
    est?: string;
    price?: string;
  };
}

export const DataAccordion = ({ title, data }: DataAccordionProps) => {
  const [isOpen, setIsOpen] = useState(true);
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
          shippingAddress: data.address1,
        };
      case "Shipment Information":
        return {
          weight: data.actualWeight,
          dimensions: `${data.length} x ${data.breadth} x ${data.height}`,
          invoiceNo: data.invoiceNo,
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
            <p className="text-franchise-sectionp">{relevantData.billingAddress}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-franchise-consignor-text">Shipping Address</h3>
            <p className="text-franchise-sectionp">{`${relevantData.shippingAddress} ${relevantData.billingAddress}`}</p>
          </div>
        </div>
      );
    } else if (title === "Shipment Information") {
      return (
        <>
          <h3 className="font-semibold">Shipment Details</h3>
          <p>{`Weight: ${relevantData.weight}`}</p>
          <p>{`Dimensions: ${relevantData.dimensions}`}</p>
          <p>{`Invoice No: ${relevantData.invoiceNo}`}</p>
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
