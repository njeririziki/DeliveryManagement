import Map from "../components/map/Map";
import { fetchOrderData } from "../services/OrderService";
import CustomCollapse from "../components/custom/CustomCollapse";
import { useQuery } from "@tanstack/react-query";
import { Descriptions, Skeleton, Typography} from "antd";
import { useError } from "../context/ErrorHandlingContext";
import Package from "../assets/package.jpg";
import { useEffect, useState } from "react";
import { Feature } from "../types";

const DeliveryOverview = () => {
  const { setError } = useError();
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
        coordinates: [+order.destinationLocation.lng as number, +order.destinationLocation.lat as number] as [number, number],
        avatar: Package,
      }));

      setOrdersMapData(mapData);
     
    }
  }, [data]);
  

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
            <div key={index}>
              <CustomCollapse
                defaultOpen={index === 0}
                topPart={
                  <div className="flex flex-row  items-center gap-4">
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
      {ordersMapData && <Map data={ordersMapData}/>}
    </div>
  );
};

export default DeliveryOverview;
