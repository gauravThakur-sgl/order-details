export const ShippingDataCard = () => {
  return (
    <div className="pb-10">
      <h2 className="pt-1 font-semibold text-base flex justify-start w-full">Select Shipping Partner</h2>
      <p className="text-xs text-gray-400 font-medium pt-2">
        All shipments via ShipGlobal Direct service are Delivered Duty Paid (DDP), hence no extra duty will be billed on
        the consignee or the shipper. Rates are inclusive of covid & fuel surcharge, exclusive of GST and ex-Delhi Hub.
      </p>
      <p className="text-sm text-gray-400 font-medium pt-4">
        If you need more info, please call/whatsapp at{" "}
        <a href="#">
          <span className="text-progress-step text-sm font-semibold"> 011-422 77 777.</span>
        </a>
      </p>
    </div>
  );
};
