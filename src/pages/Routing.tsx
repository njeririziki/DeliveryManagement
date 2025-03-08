import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./Users";
import UserDetails from "./UserDetails";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
import DeliveryOverview from "./DeliveryOverview";
import BaseLayout from "../components/Layout";
import SingleOrders from "./SingleOrder";
import LoginPage from "./LoginPage";

function Routing() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<BaseLayout />}>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/delivery" element={<DeliveryOverview />} />
          <Route path="/track" element={<SingleOrders />} />
        </Route>
      </Routes>
     
    </Router>
  );
}

export default Routing;
