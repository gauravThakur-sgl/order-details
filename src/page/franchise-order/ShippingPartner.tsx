import { Accordion } from "./components/Accordion";

export const ShippingPartner = () => {
  return (
    <div>
      <Accordion
        items={[
          {
            title: "Select Shipping Partner",
          },
        ]}
      >
        <div>
          <p className="text-franchise-sectionp text-sm">
            All shipments via ShipGlobal services are <span className="font-bold">Delivered Duty Paid (DDP)</span>,
            hence <span className="font-bold">no extra duty</span> will be billed on the consignee or the shipper. Rates
            are inclusive of covid & fuel surcharge, exclusive of GST and ex-Delhi Hub.
          </p>
          <p className="pt-5">
            In case any doubt, please call/whatsapp at{" "}
            <a href="" className="text-franchise-primary font-semibold">
              011-422 77777
            </a>
          </p>
          <div className="flex justify-center items-center gap-4 text-franchise-sectionp mt-5 px-12">
            <div className="flex flex-col justify-center items-center border rounded-md bg-[#FAFAFA] py-2 px-5">
              <p>1 KG</p>
              <p className="text-sm">Dead Weight</p>
            </div>
            <div className="flex flex-col justify-center items-center border rounded-md bg-[#FAFAFA] py-2 px-5">
              <p>1 KG</p>
              <p className="text-sm">Dead Weight</p>
            </div>
            <div className="flex flex-col justify-center items-center  border border-orange-600 rounded-md bg-franchise-weight-bg text-franchise-weight-text py-2 px-5">
              <p>1 KG</p>
              <p className="text-sm">Billed Weight</p>
            </div>
          </div>

          <div className="text-sm font-semibold">
            <p>Showing 1 Results</p>
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
      </Accordion>
    </div>
  );
};
