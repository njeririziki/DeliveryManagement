import { Skeleton, Typography } from "antd";
import Map from "../components/map/Map";
import { Feature, User, Order } from "../types";
import { fetchUserDetails } from "../services/UsersService";
import {fetchOrderData} from "../services/OrderService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import userAvatars from "../data/userAvatars";
import { useQuery } from "@tanstack/react-query";
import { useError } from "../context/ErrorHandlingContext";
import OrderCollapseComponent from "../components/reusable/OrderCollapse";
import StandardButton from "../components/custom/StandardButton";
import UserCollapse from "../components/reusable/UserCollapse";
import CreateEditUserDetails from "../components/reusable/CreateEditUserDetails";

const UserDetails = () => {

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserMapData, setSelectedUserMapData] = useState<Feature[] | null>(null);
  const [userOrders, setUserOrders] = useState<Order[] | null>(null);
  const [userOrdersMapData, setUserOrdersMapData] = useState<Feature[] | null>(null);
  const [typeOfLayer, setTypeOfLayer] = useState<string | null>(null);

  const { setError } = useError();
  const id = Number(useParams<{ id: string }>().id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserDetails({ id }),
  });


  useEffect(() => {
    if (data) {
      setSelectedUser(data);

      setSelectedUserMapData([{
       featureName: data.name,
       address:` ${data.address.street}, ${data.address.suite}`,
       coordinates: [+data.address.geo.lng, +data.address.geo.lat],
        avatar: userAvatars[data.id - 1].src,
        type: "point",
      }]);
    }

    setTypeOfLayer("point");
  }, [data]);

  const {  data:orders } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrderData,
  });

  useEffect(() => {
    if (orders) {
     const userOrders= orders.filter((order:Order ) => order.customerId === id);
     setUserOrders(userOrders);

      const userOrdersMapData = userOrders.map((order) => {
        return {
          featureName: order.shipmentId,
          address: order.address,
          customerName: order.customerName,
          ordercoordinates: [+order.orderLocation.lng, +order.orderLocation.lat] as [number, number],
          coordinates:[+order.destinationLocation.lng, +order.destinationLocation.lat] as [number, number],
          type: "singleLine",
          avatar: userAvatars[order.customerId - 1].src,
        };
      });
      setUserOrdersMapData(userOrdersMapData);
     
    }
  },
  [orders]);

  const showSingleLine = (id: string) => {    
    const updatedData = userOrdersMapData?.filter((order) => order.featureName === id) || [];
    setSelectedUserMapData(updatedData);
    setTypeOfLayer('singleLine');
  }

  if (isLoading) return <Skeleton active />;
  if (error) {
    setError(error.message);
    return <Typography.Text>Error loading user details</Typography.Text>;
  }
  return (
    <div>
      {selectedUser ? (
        <div className=" w-full h-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
           <UserCollapse
            selectedUser={selectedUser}
            openUser={true}
            actions={
              <CreateEditUserDetails marker={
              <div              
              className="mr-4 text-xs bg-gray-50 text-gray-500 border border-gray-300 p-2 h-fit text-nowrap rounded-full ">
              Edit
            </div>
            } />
            }
            />
            <Typography.Title level={5}>Current Orders</Typography.Title>
            {userOrders && userOrders.map(order=>(
              <OrderCollapseComponent
                openOrder={true}
                order={order}
                actions={
                  <StandardButton
                  name="Track"
                  customStyles="mt-4 h-fit bg-green-500 hover:bg-green-700 text-white"
                  onClick={() => showSingleLine(order.shipmentId)}
                  />
                }
                />
            ))}
          </div>
          {selectedUserMapData && typeOfLayer && <Map type={typeOfLayer} data={selectedUserMapData} />}
        </div>
      ) : (
        <Typography.Text>No user</Typography.Text>
      )}
    </div>
  );
};

export default UserDetails;
