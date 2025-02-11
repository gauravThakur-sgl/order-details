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
        Select Shipping Partner
      </Accordion>
    </div>
  );
};
