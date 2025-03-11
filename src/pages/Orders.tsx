import { Avatar, List, Skeleton, Typography, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchOrderData } from "../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import Package from "../assets/package.jpg";
import StaticCard from "../components/custom/StatisticCard";
import { statisticData } from "../data/statisticalData";
import { useError } from "../context/ErrorHandlingContext";
import { useState } from "react";



const Orders = () => {
  const navigate = useNavigate();
  const { setError } = useError();
  const [searchQuery, setSearchQuery] = useState("");


  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrderData,
  });
  
  const handleNavigation = (orderId: string) => {
    sessionStorage.setItem("orderId", orderId);
    navigate(`/orderdetails`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };


  
  const filteredData = data?.filter((order) =>
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.shipmentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    setError(error.message);
    return <Typography.Text>Error loading order details</Typography.Text>;
  }
  if (isLoading) return <Skeleton active />;
  if (!data) return <Typography.Text> No orders available</Typography.Text>;

  return (
    <div className="w-full">
  
      <div className="w-full bg-white mb-4 p-4 flex flex-col  lg:flex-row justify-stretch gap-4 rounded-lg ">
        {statisticData.map((data, index) => (
          <StaticCard key={index} title={data.title} card={data.card} />
        ))}
      </div>
      <div className="w-full justify-end lg:w-1/2 p-4">
          <Input
          placeholder="Search by user or tracking ID"
          
          value={searchQuery}
          onChange={handleSearch}
          size="large"
          className="  "
        />
        </div>
      <div className="w-full p-4 flex flex-col lg:flex-row justify-stretch gap-4 rounded-lg ">
        <div className="bg-white w-full lg:w-1/2 border border-gray-200 rounded-lg p-4">
          <List
        header={
          <div className="w-full flex flex-row justify-between">
            <p className="font-semibold">Shipped Orders</p>
          </div>
        }
        itemLayout="horizontal"
        dataSource={filteredData}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            actions={[
          <a
            key="list-loadmore-more"
            onClick={() => handleNavigation(item.id)}
          >
            more
          </a>,
            ]}
          >
            <List.Item.Meta
          avatar={<Avatar src={Package} />}
          title={`Tracking ID: ${item.shipmentId}  `}
          description={`${item.customerName}. Delivery by ${item.estimatedDelivery}`}
            />
          </List.Item>
        )}
          />
        </div>
        <div className="bg-white w-full lg:w-1/2 border border-gray-200 rounded-lg p-4">
          <List
        header={<p className="font-semibold">Delayed Orders</p>}
        itemLayout="horizontal"
        dataSource={filteredData}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            actions={[
          <a
            key="list-loadmore-more"
            onClick={() => handleNavigation(item.id)}
          >
            more
          </a>,
            ]}
          >
            <List.Item.Meta
          avatar={<Avatar src={Package} />}
          title={` ${item.customerName}`}
          description={`Items: ${item.items.join(", ")}`}
            />
          </List.Item>
        )}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
