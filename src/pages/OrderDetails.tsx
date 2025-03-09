import React, { useEffect, useState } from "react";
import { Descriptions, Skeleton, Typography } from "antd";
import { Order } from "../types";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderData } from "../services/OrderService";
import { useError } from "../context/ErrorHandlingContext";
import CustomCollapse from "../components/custom/CustomCollapse";
import Package from "../assets/package.svg";

const OrderDetails = () => {
  const id = Number(useParams<{ id: string }>().id);

  const [order, setOrder] = useState<Order | null>(null);
  const { setError } = useError();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrderData,
  });

  useEffect(() => {
    if (id && data && data.length > 0) {
      const order = data.find((order) => Number(order.id) === id);

      if (order) {
        setOrder(order);
      }
    }
  }, [id, data]);

  if (error) return setError(error.message);
  if (isLoading) return <Skeleton active />;
  if (!order) return <Typography.Text>No order available</Typography.Text>;
  return (
    <div className="w-1/3">
      <Typography.Title level={5}>Order : GRSWFY0{order.id} </Typography.Title>

      <CustomCollapse
        defaultOpen={true}
        topPart={
          <div className="flex flex-row  items-center gap-4">
            <img src={Package} className="bg-gray-100 rounded-full p-2" />
            <div className="flex flex-col ">
              <p>Shipment ID </p>
              <p className="font-semibold"> GRSWFY0{order.id}</p>
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
  );
};

export default OrderDetails;
