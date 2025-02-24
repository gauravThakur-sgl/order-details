import { useState } from "react";
import { DataAccordionProps } from "../interface";
import { ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export const DataAccordion = ({ title, data, initialIsOpen }: DataAccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialIsOpen ?? true);
  const [showMore, setShowMore] = useState(false);
  // const [isSameAddress, setIsSameAddress] = useState(true);
  // const [currency, setCurrency] = useState<string>("INR");

  const infoTitle = "text-franchise-consignor-text";
  const infoDetail = "text-franchise-sectionp text-sm font-medium";
  const userData = useSelector((state: RootState) => state.order);
  const isSameAddress = userData.isChecked;
  const currency = userData.shipmentInformation.invoiceCurrency;

  // const getCheckState = () => {
  //   const isChecked = localStorage.getItem("isChecked");
  //   return isChecked ? JSON.parse(isChecked) : true;
  // };
  // useEffect(() => {
  //   const updatedState = () => {
  //     setIsSameAddress(getCheckState());
  //   };
  //   updatedState();
  //   window.addEventListener("storage", updatedState);
  //   return () => {
  //     window.removeEventListener("storage", updatedState);
  //   };
  // }, []);

  // const getCurrency = () => {
  //   const storedCurrency = localStorage.getItem("currency");
  //   return storedCurrency ? JSON.parse(storedCurrency) : "INR";
  // };

  // useEffect(() => {
  //   const updatedCurrency = () => {
  //     setCurrency(getCurrency());
  //   };
  //   updatedCurrency();
  //   window.addEventListener("storage", updatedCurrency);
  //   return () => {
  //     window.removeEventListener("storage", updatedCurrency);
  //   };
  // }, []);

  const countryName = userData.countryName;
  const billingCountryName = userData.billingCountryName;
  const addressData = data.pickupAddress ? JSON.parse(data.pickupAddress) : {};
  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  const handleHide = () => {
    setShowMore(false);
  };

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
          billingAddress2: data.billingAddress2,
          billingLandMark: data.billingLandMark,
          billingCity: data.billingcity,
          billingCountry: data.billingCountry,
          billingState: data.billingState,
          billingPincode: data.billingPincode,
          shippingAddress: data.address1,
          shippingAddress2: data.address2,
          landmark: data.landMark,
          city: data.shippingcity,
          country: data.country,
          state: data.shippingState,
          pincode: data.shippingPincode,
        };
      case "Item Details":
        return {
          weight: data.actualWeight,
          dimensions: `${data.length} cm x ${data.breadth} cm x ${data.height} cm`,
          items: data.items.map(
            (item: { productName: string; hsn: string; sku: string; qty: string; unitPrice: string }) => ({
              product: item.productName,
              hsn: item.hsn,
              sku: item.sku,
              qty: item.qty,
              unit: item.unitPrice,
              total: Number(item.qty) * Number(item.unitPrice),
            }),
          ),
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
  const renderData = () => {
    if (title === "Consignor Detail") {
      return (
        <>
          <div className="space-y-1">
            <h3 className={`${infoTitle}`}>Name</h3>
            <p className={`${infoDetail}`}>{`${relevantData.name} | ${relevantData.mobileNumber}`}</p>
            <p className="text-franchise-sectionp">{relevantData.email}</p>
          </div>
          <div className="space-y-1 pt-2">
            <h3 className={`${infoTitle}`}>Address</h3>
            <p className="text-franchise-sectionp">{relevantData.address}</p>
          </div>
        </>
      );
    } else if (title === "Consignee Detail") {
      return (
        <div className="space-y-2">
          <div className="space-y-1">
            <h3 className={`${infoTitle}`}>Name</h3>
            <p className={`${infoDetail}`}>{`${relevantData.name} | ${relevantData.mobileNumber}`}</p>
          </div>
          <div className="space-y-1">
            <h3 className={`${infoTitle}`}>Billing Address</h3>
            <p className="text-franchise-sectionp">
              {isSameAddress
                ? "Same as shipping address"
                : `${relevantData.billingAddress} ${relevantData.billingAddress2} ${relevantData.billingLandMark} ${relevantData.billingCity} ${relevantData.billingState} ${billingCountryName} ${relevantData.billingPincode}`}
            </p>
          </div>
          <div className="space-y-1">
            <h3 className={`${infoTitle}`}>Shipping Address</h3>
            <p className="text-franchise-sectionp">{`${relevantData.shippingAddress} ${relevantData.shippingAddress2} ${relevantData.landmark} ${relevantData.city} ${relevantData.state} ${countryName} ${relevantData.pincode}`}</p>
          </div>
        </div>
      );
    } else if (title === "Item Details") {
      return (
        <div>
          <div className="flex justify-between pr-10">
            <div className="space-y-1">
              <h3 className={`${infoTitle}`}>Billed Weight</h3>
              <p className={`${infoDetail}`}>{`${relevantData.weight} KG`}</p>
            </div>
            <div className="space-y-1">
              <h3 className={`${infoTitle}`}>Dimensions</h3>
              <p className={`${infoDetail}`}>{`${relevantData.dimensions}`}</p>
            </div>
          </div>
          {relevantData.items &&
            relevantData.items.map((item, index) => (
              <div key={index}>
                {index === 0 || showMore ? (
                  <>
                    <div key={index} className="grid grid-cols-3 justify-between pr-4 pt-4">
                      <div className="space-y-1">
                        <h3 className={`${infoTitle}`}>Product</h3>
                        <p className={`${infoDetail}`}>{`${item.product}`}</p>
                      </div>
                      <div className="space-y-1">
                        <h3 className={`${infoTitle}`}>HSN</h3>
                        <p className={`${infoDetail}`}>{`${item.hsn}`}</p>
                      </div>
                      <div className="space-y-1">
                        <h3 className={`${infoTitle}`}>SKU</h3>
                        <p className={`${infoDetail}`}>{`${item.sku}`}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 justify-between pr-4 pt-4">
                      <div className="space-y-1">
                        <h3 className={`${infoTitle}`}>Qty</h3>
                        <p className={`${infoDetail}`}>{`${item.qty}`}</p>
                      </div>
                      <div className="space-y-1">
                        <h3 className={`${infoTitle}`}>Unit Price</h3>
                        <p className={`${infoDetail}`}>{`${currency} ${item.unit}.00`}</p>
                      </div>
                      <div className="space-y-1">
                        <h3 className={`${infoTitle}`}>Total</h3>
                        <p className={`${infoDetail}`}>{`${currency} ${item.total}.00`}</p>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            ))}
          {relevantData.items && relevantData.items.length > 1 && (
            <div className="pt-4">
              {!showMore ? (
                <span className="flex justify-between">
                  <span className="text-franchise-weight-text text-xs font-medium">{`+${
                    relevantData.items.length - 1
                  } more products...`}</span>
                  <button onClick={handleShowMore} className="underline text-franchise-primary text-sm font-medium">
                    View
                  </button>
                </span>
              ) : (
                <button
                  onClick={handleHide}
                  className="underline text-franchise-primary text-sm font-medium flex w-full justify-end"
                >
                  Hide
                </button>
              )}
            </div>
          )}
        </div>
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
      <h2
        className="font-semibold mb-2 text-base flex justify-between items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        {title}
        <span>
          <ChevronDown className={`h-5 w-5 text-slate-400 ${isOpen ? "rotate-180" : ""}`} />
        </span>
      </h2>
      {isOpen && <div className="text-sm text-gray-700">{renderData()}</div>}
    </div>
  );
};
