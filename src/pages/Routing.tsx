import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./Users";
import UserDetails from "./UserDetails";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
import DeliveryOverview from "./DeliveryOverview";
import BaseLayout from "../components/custom/Layout";

function Routing() {
  return (
    <Router>
      <BaseLayout>
      <Routes>
      
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/delivery" element={<DeliveryOverview />} />
      </Routes>
      </BaseLayout>
    </Router>
  );
}

export default Routing;
