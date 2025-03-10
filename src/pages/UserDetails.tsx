import { Descriptions, Skeleton, Typography } from "antd";
import Map from "../components/map/Map";
import { Feature, User } from "../types";
import { fetchUserDetails } from "../services/UsersService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomCollapse from "../components/custom/CustomCollapse";
import user1 from "../assets/user1.jpg";
import { useQuery } from "@tanstack/react-query";
import { useError } from "../context/ErrorHandlingContext";

const UserDetails = () => {

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserMapData, setSelectedUserMapData] = useState<Feature[] | null>(null);

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
        avatar: user1
      }]);
    }
  }, [data]);

  if (isLoading) return <Skeleton active />;
  if (error) {
    setError(error.message);
    return <Typography.Text>Error loading user details</Typography.Text>;
  }
  return (
    <div>
      {selectedUser ? (
        <div className="flex flex-row gap-4">
          <div className="w-1/2">
            <CustomCollapse
              defaultOpen={true}
              topPart={
                <div className="flex flex-row  items-center gap-4">
                  <img
                    src={user1}
                    className="bg-gray-100 rounded-full w-16 h-16"
                  />
                  <div className="flex flex-col ">
                    <p>Username </p>
                    <p className="font-semibold"> {selectedUser.username}</p>
                  </div>
                </div>
              }
            >
              <div className=" flex border-t border-gray-200 pt-4 flex-row  ">
                <Descriptions title="User Info" column={1}>
                  <Descriptions.Item label="Name">
                    {selectedUser.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {selectedUser.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone">
                    {selectedUser.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label="Website">
                    {selectedUser.website}
                  </Descriptions.Item>
                  <Descriptions.Item label="Address">
                    {selectedUser.address.street}, {selectedUser.address.suite},{" "}
                    {selectedUser.address.city}
                  </Descriptions.Item>
                  <Descriptions.Item label="Zipcode">
                    {selectedUser.address.zipcode}
                  </Descriptions.Item>
                </Descriptions>
                <div className="text-xs bg-green-50 text-green-500 border border-green-300 p-2 h-fit text-nowrap rounded-full ">
                  {"Active"}
                </div>
              </div>
            </CustomCollapse>
          </div>
          {selectedUserMapData && <Map data={selectedUserMapData} />}
        </div>
      ) : (
        <Typography.Text>No user</Typography.Text>
      )}
    </div>
  );
};

export default UserDetails;
