import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./Users";
import IndividualUser from "./IndividualUser";
import Orders from "./Orders";
import IndividualOrder from "./IndividualOrder";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<IndividualUser />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<IndividualOrder />} />
      </Routes>
    </Router>
  );
}

export default Routing;
