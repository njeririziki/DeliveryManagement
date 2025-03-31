import React, { useEffect, useState } from "react";
import {  Skeleton, Typography } from "antd";
import { Order , Feature } from "../types";
import Map from "../components/map/Map";
import { useQuery } from "@tanstack/react-query";
import { fetchSpecificOrderData } from "../services/OrderService";
import { useError } from "../context/ErrorHandlingContext";

import userAvatars from "../data/userAvatars";
import OrderCollapseComponent from "../components/reusable/OrderCollapse";

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

      <OrderCollapseComponent
      order={order}
      openOrder={true}
      actions={<div></div>}
      />
    </div>
    
    {ordersMapData && <Map type='singleLine' data={ordersMapData}/>}
    </div>
  );
};

export default OrderDetails;
