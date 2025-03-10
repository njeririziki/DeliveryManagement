import Map from "../components/map/Map";
import { fetchOrderData } from "../services/OrderService";
import CustomCollapse from "../components/custom/CustomCollapse";
import { useQuery } from "@tanstack/react-query";
import { Descriptions, Skeleton, Typography} from "antd";
import { useError } from "../context/ErrorHandlingContext";
import Package from "../assets/package.jpg";
import User2 from "../assets/user2.jpg";
import { useEffect, useState } from "react";
import { Feature } from "../types";

const DeliveryOverview = () => {
  const { setError } = useError();
  const [typeOfLayer, setTypeOfLayer] = useState("multipleLines");
  const [ordersMapData, setOrdersMapData] = useState<Feature[] | null>(null)
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrderData,
  });

  useEffect(() => {
    if (data) {
      const mapData = data.map((order) => ({
        featureName: order.shipmentId,
        address: order.address,
        ordercoordinates: [Number(order.orderLocation.lng), Number(order.orderLocation.lat)] as [number, number],
        coordinates: [Number(order.destinationLocation.lng), Number(order.destinationLocation.lat)] as [number, number],
        avatar: User2,
        type: "singleLine",
      }));

      setOrdersMapData(mapData);
     
    }
  }, [data]);
  
 

  const showSingleLine = (id: string) => {
    setTypeOfLayer("singleLine");
    setOrdersMapData((prevData) => {
      const order = prevData?.find((order) => order.featureName === id);
      return order ? [order] : prevData;
    });
  }

  if (error) {
      setError(error.message);
      return <Typography.Text>Error loading order details</Typography.Text>;
    }
  if (isLoading) return <Skeleton active />;
  if (!data) return <Typography.Text>No order available</Typography.Text>;
  return (
    <div className="flex flex-row gap-4">
      <div className="w-1/3 flex flex-col gap-4">
        {data &&
          data.map((order, index) => (
            <div key={index} onClick={() => showSingleLine(order.shipmentId)}>
              <CustomCollapse
                defaultOpen={index === 0}
                topPart={
                  <div className="flex flex-row  items-center gap-4"
                   >
                    <img
                      src={Package}
                      className="bg-gray-100 rounded-full w-16 h-16"
                    />
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
          ))}
      </div>
      {ordersMapData && <Map type={typeOfLayer} data={ordersMapData}/>}
    </div>
  );
};

export default DeliveryOverview;
