import Map from "../components/map/Map";
import { fetchOrderData } from "../services/OrderService";
import CustomCollapse from "../components/custom/CustomCollapse";
import { useQuery } from "@tanstack/react-query";
import { Descriptions, Skeleton, Typography} from "antd";
import { useError } from "../context/ErrorHandlingContext";
import Package from "../assets/package.jpg";
import userAvatars from "../data/userAvatars";
import { useEffect, useState } from "react";
import { Feature } from "../types";
import StandardButton from "../components/custom/StandardButton";

const DeliveryOverview = () => {
 
  const { setError } = useError();
  const [typeOfLayer, setTypeOfLayer] = useState<string | null>(null);
  const [ordersMapData, setOrdersMapData] = useState<Feature[] | null>(null)
  const [singleOrderMap, setSingleOrderMap] = useState<Feature[] | null>(null)
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrderData,
  });

  useEffect(() => {
    if (data) {
      const mapData = data.map((order) => ({
        featureName: order.shipmentId,
        address: order.address,
        customerName: order.customerName,
        ordercoordinates: [Number(order.orderLocation.lng), Number(order.orderLocation.lat)] as [number, number],
        coordinates: [Number(order.destinationLocation.lng), Number(order.destinationLocation.lat)] as [number, number],
        avatar: userAvatars[order.customerId - 1].src,
        
      }));
   
      setOrdersMapData(mapData);
      setTypeOfLayer("multipleLines");
    }
  }, [data]);
  
 

  const showSingleLine = (id: string) => {    
    const updatedData = ordersMapData?.filter((order) => order.featureName === id) || [];
    setSingleOrderMap(updatedData);
    setTypeOfLayer('singleLine');
  }



  if (error) {
      setError(error.message);
      return <Typography.Text>Error loading order details</Typography.Text>;
    }
  if (isLoading) return <Skeleton active />;
  if (!data) return <Typography.Text>No order available</Typography.Text>;
  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        {data &&
          data.map((order, index) => (
            <div key={index} >
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
                  <StandardButton
                    name="Track"
                    customStyles="mt-4 h-fit bg-green-500 hover:bg-green-700 text-white"
                    onClick={() => showSingleLine(order.shipmentId)}
                    />
                 
                </div>
              </CustomCollapse>
            </div>
          ))}
      </div>
      {ordersMapData && typeOfLayer && <Map type={typeOfLayer}
       data={singleOrderMap?.length? singleOrderMap :ordersMapData}/>}
    </div>
  );
};

export default DeliveryOverview;
