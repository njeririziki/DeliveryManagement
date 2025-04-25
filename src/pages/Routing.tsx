import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./Users";
import UserDetails from "./UserDetails";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
import DeliveryOverview from "./DeliveryOverview";
import BaseLayout from "../components/Layout";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import NotFoundPage from "./NotFoundPage";

function Routing() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route element={<BaseLayout />}>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orderdetails" element={<OrderDetails />} />
          <Route path="/delivery" element={<DeliveryOverview />} />
          {/* <Route path="/orders/:id" element={<OrderDetails />} /> */}
          <Route path="/couriers" element={<NotFoundPage/>} />
          <Route path="/settings" element={<NotFoundPage/>} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
     
    </Router>
  );
}

export default Routing;
