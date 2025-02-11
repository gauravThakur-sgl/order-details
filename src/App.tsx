import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Order } from "./page/Order";
import { AddOrder } from "./page/franchise-order/AddOrder";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Order />} />
          <Route path="order" element={<AddOrder />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
