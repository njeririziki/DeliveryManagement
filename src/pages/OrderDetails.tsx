import React, { useEffect, useState } from "react";
import { Descriptions, Skeleton, Typography } from "antd";
import { Order , Feature } from "../types";
import Map from "../components/map/Map";
import { useQuery } from "@tanstack/react-query";
import { fetchSpecificOrderData } from "../services/OrderService";
import { useError } from "../context/ErrorHandlingContext";
import CustomCollapse from "../components/custom/CustomCollapse";
import Package from "../assets/package.svg";
import userAvatars from "../data/userAvatars";

const OrderDetails: React.FC = () => {
  const id = Number(sessionStorage.getItem("orderId"));

  const [order, setOrder] = useState<Order | null>(null);
  const [ordersMapData, setOrdersMapData] = useState<Feature[] | null>(null)
    
  const { setError } = useError();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders",id],
    queryFn: ()=>fetchSpecificOrderData({id}),
  });

  useEffect(() => {
    if (data) {
      setOrder(data);
      
      setOrdersMapData([{
        featureName: data.shipmentId,
        address: data.address,
        customerName: data.customerName,
        ordercoordinates: [Number(data.orderLocation.lng), Number(data.orderLocation.lat)] as [number, number],
        coordinates: [Number(data.destinationLocation.lng), Number(data.destinationLocation.lat)] as [number, number],
        avatar: userAvatars[data.customerId - 1].src,
        type: "singleLine",
      }]);
    }
  }, [data]);

  if (error) {
    setError(error.message);
    return <Typography.Text>Error loading order details</Typography.Text>;
  }
  if (isLoading) return <Skeleton active />;
  if (!order) return <Typography.Text>No order available</Typography.Text>;
  return (
    <div className=" w-full h-full flex  flex-col lg:flex-row gap-4">
    <div className="w-full lg:w-1/3">
      <Typography.Title level={5}>Order : {order.shipmentId} </Typography.Title>

      <CustomCollapse
        defaultOpen={true}
        topPart={
          <div className="flex flex-row  items-center gap-4">
            <img src={Package} className="bg-gray-100 rounded-full p-2" />
            <div className="flex flex-col ">
              <p>Shipment ID </p>
              <p className="font-semibold"> {order.shipmentId}</p>
            </div>
          </div>
        }
      >
        <div className=" flex border-t border-gray-200 pt-4 flex-row  ">
          <Descriptions title="Order Info" column={1}>
            <Descriptions.Item label="Estimated Delivery">
              {order.estimatedDelivery}
            </Descriptions.Item>
            <Descriptions.Item label="Customer">
              {order.customerName}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {order.address}
            </Descriptions.Item>
            <Descriptions.Item label="Items">
              {order.items.join(", ")}
            </Descriptions.Item>
          </Descriptions>
          <div className="text-xs bg-green-50 text-green-500 border border-green-300 p-2 h-fit text-nowrap rounded-full ">
            {" "}
            {order.status}
          </div>
        </div>
      </CustomCollapse>
    </div>
    
    {ordersMapData && <Map type='singleLine' data={ordersMapData}/>}
    </div>
  );
};

export default OrderDetails;
