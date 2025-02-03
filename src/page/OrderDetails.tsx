import { useState } from "react";
import Select from "../components/demo";
import { ShipMentCard } from "../components/ShipMentCard";
import { ShipMentMeasurement } from "../components/ShipMentMeasurement";
import Input from "../components/ui/Input";
import { DeleteIcon } from "lucide-react";

export const OrderDetails = () => {
  const orderDetails = [
    { name: "Invoice No.", required: true },
    { name: "Invoice Date", required: true },
    {
      name: "Invoice Currency",
      required: true,
      currencyData: [
        { label: "USD", value: "USD" },
        { label: "INR", value: "INR" },
      ],
    },
    { name: "OrderId/RefId", required: true },
    { name: "IOSS Number", required: true },
  ];
  const [products, setProducts] = useState([
    { productName: "", sku: "", hsn: "", qty: "", unitPrice: "", igst: "", required: true },
  ]);

  // Add Product
  const addProduct = () => {
    setProducts([...products, { productName: "", sku: "", hsn: "", qty: "", unitPrice: "", igst: "", required: true }]);
    console.log(products);
  };

  // Removes Product
  interface Product {
    productName: string;
    sku: string;
    hsn: string;
    qty: string;
    unitPrice: string;
    igst: string;
    required: boolean;
  }

  const removeProduct = (index: number) => {
    const updatedProducts: Product[] = [];
    for (let i = 0; i < products.length; i++) {
      if (i !== index) {
        updatedProducts.push(products[i]);
      }
      console.log(index);
    }
    setProducts(updatedProducts);
    console.log(updatedProducts);
  };
  return (
    <div className="pb-20">
      <h2 className="pt-1 font-semibold text-basis flex justify-start w-full">ShipMent Type</h2>
      <p className="text-xs text-gray-400 font-medium pt-2">
        Please select the shipment Mode. Note: CSB-V Shipments can only be sent through ShipGlobal Direct. If other
        partner services are needed please select CSB IV.
      </p>
      <p className="text-sm text-gray-400 font-medium pt-4">
        If you need more info, please call/whatsapp at{" "}
        <a href="#">
          <span className="text-progress-step text-sm font-semibold"> +91 9811098919.</span>
        </a>
      </p>
      <ShipMentCard />
      <h2 className="pt-16 font-semibold text-basis flex justify-start w-full">ShipMent Details</h2>
      <p className="text-sm text-gray-400 font-medium pt-2">
        If you need more info, please check out{" "}
        <a href="#">
          <span className="text-progress-step text-sm font-semibold">Help Page</span>
        </a>
      </p>
      <ShipMentMeasurement />
      <h2 className="pt-1 font-semibold text-basis flex justify-start w-full mt-10">Order Details</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5">
        {orderDetails.map((data, index) => (
          <div className="flex justify-center items-end">
            <div className="w-full">
              {data.currencyData ? (
                <Select key={index} title={data.name} className="appearence-none  z-10" options={data.currencyData} />
              ) : (
                <Input
                  key={index}
                  name={data.name}
                  labelData={data.name}
                  required={data.required}
                  type="text"
                  className="appearence-none z-10"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <h2 className="pt-1 font-semibold text-basis flex justify-start w-full mt-10">Items Details</h2>
      <div>
        {products.map((products, index) => (
          <div
            key={index}
            className={`flex flex-col justify-center items-center md:flex-row gap-2 mt-4 w-full ${
              index > 0 ? "pr-2" : "pr-[35px]"
            }`}
          >
            <Input
              key={index}
              name={products.productName}
              labelData="Product Name"
              required={products.required}
              type="text"
              className="appearence-none z-10"
            />
            <Input
              key={index}
              name={products.sku}
              labelData="SKU"
              required={products.required}
              type="text"
              className="appearence-none z-10"
            />
            <Input
              key={index}
              name={products.hsn}
              labelData="HSN"
              required={products.required}
              type="text"
              className="appearence-none"
            />
            <Input
              key={index}
              name={products.qty}
              labelData="Qty"
              required={products.required}
              type="text"
              className="appearence-none z-10"
            />
            <Input
              key={index}
              name={products.unitPrice}
              labelData="Unit Price(INR)"
              required={products.required}
              type="text"
              className="appearence-none z-10"
            />
            <Input
              key={index}
              name={products.igst}
              labelData="IGST"
              required={products.required}
              type="text"
              className="appearence-none z-10"
            />
            {index > 0 && (
              <div className="mt-4" onClick={() => removeProduct(index)}>
                <DeleteIcon className="h-[20px] w-[20px] mt-2 text-red-primary cursor-pointer" />
              </div>
            )}
          </div>
        ))}
        <button
          className="text-progress-step bg-card-background rounded-md p-2 px-4 text-base flex justify-center items-center gap-2 mt-5"
          onClick={addProduct}
        >
          <span>+</span>Add
        </button>
      </div>
    </div>
  );
};
