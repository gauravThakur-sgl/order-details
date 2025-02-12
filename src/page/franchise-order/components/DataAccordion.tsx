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
  const extractRelevantData = (key: string, data: DataAccordionProps["data"]) => {
    switch (key) {
      case "consignorDetail": {
        const consignorData = data.pickupAddress ? JSON.parse(data.pickupAddress) : {};
        return {
          name: `${consignorData.firstName} ${consignorData.lastName}`,
          mobileNumber: consignorData.mobileNo,
          email: consignorData.email,
          address: consignorData.billingAddress,
        };
      }
      case "consigneeDetail":
        return {
          name: data.firstName + " " + data.lastName,
          mobileNumber: data.mobileNumber,
          billingAddress: data.billingAddress1,
          shippingAddress: data.address1,
        };
      case "shipmentInformation":
        return {
          weight: data.actualWeight,
          dimensions: `${data.length} x ${data.breadth} x ${data.height}`,
          invoiceNo: data.invoiceNo,
        };
      case "shippingPartner":
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

  const renderData = () => {
    if (title === "consignorDetail") {
      return (
        <>
          <h3 className="font-semibold">Name</h3>
          <p>{`${relevantData.name} | ${relevantData.mobileNumber}`}</p>
          <p>{relevantData.email}</p>
          <h3 className="font-semibold">Address</h3>
          <p>{relevantData.address}</p>
        </>
      );
    } else if (title === "consigneeDetail") {
      return (
        <>
          <h3 className="font-semibold">Name</h3>
          <p>{`${relevantData.name} | ${relevantData.mobileNumber}`}</p>
          <h3 className="font-semibold">Billing Address</h3>
          <p>{relevantData.billingAddress}</p>
          <h3 className="font-semibold">Shipping Address</h3>
          <p>{relevantData.shippingAddress}</p>
        </>
      );
    } else if (title === "shipmentInformation") {
      return (
        <>
          <h3 className="font-semibold">Shipment Details</h3>
          <p>{`Weight: ${relevantData.weight}`}</p>
          <p>{`Dimensions: ${relevantData.dimensions}`}</p>
          <p>{`Invoice No: ${relevantData.invoiceNo}`}</p>
        </>
      );
    } else if (title === "shippingPartner") {
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
      <h2 className="text-lg font-semibold" onClick={toggleAccordion}>
        {title}
      </h2>
      {isOpen && <div className="text-sm text-gray-700">{renderData()}</div>}
    </div>
  );
};
