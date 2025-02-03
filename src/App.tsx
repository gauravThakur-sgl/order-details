import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Order } from "./page/Order";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Order />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
