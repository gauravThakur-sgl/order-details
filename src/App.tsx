import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Order } from "./page/Order";
import { Stepper } from "./components/Stepper";
import { Test } from "./page/practice/Test";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Order />} />
          <Route path="/add-order" element={<Stepper />} />
          <Route path="/redux" element={<Test />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
