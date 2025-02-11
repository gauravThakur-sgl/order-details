import { Accordion } from "./components/Accordion";

export const ShipmentInformation = () => {
  return (
    <div>
      <Accordion
        items={[
          {
            title: "ShipMent Information",
          },
        ]}
      >
        ShipMent Information
      </Accordion>
    </div>
  );
};
