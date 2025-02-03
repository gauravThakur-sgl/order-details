import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { BuyerDetail } from "./BuyerDetail";
import { Stepper } from "../components/Stepper";
import { OrderDetails } from "./OrderDetails";
import { ShippingPartner } from "./ShippingPartner";
import { PlaceOrder } from "./PlaceOrder";

const stepTitles = ["Buyer Details", "Order Details", "Shipping Partner", "Place Order"];
const stepComponents = [<BuyerDetail />, <OrderDetails />, <ShippingPartner />, <PlaceOrder />];

export const Order = () => {
  return (
    <div>
      <Header />
      <SideBar />
      <div className="font-poppins pt-20 bg-gray-100 min-h-dvh">
        <Container>
          <div className="w-full m-4 flex flex-col lg:flex-row">
            <Stepper steps={stepTitles}>{stepComponents}</Stepper>
          </div>
        </Container>
      </div>
    </div>
  );
};
