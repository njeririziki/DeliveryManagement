import { Descriptions, Typography } from "antd";
import Map from "../components/map/Map";
import { User } from "../types";
import { fetchUserDetails } from "../services/UsersService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const id = Number(useParams<{ id: string }>().id);

  useEffect(() => {
    if (id) {
      fetchUserDetails({ id })
        .then((data) => {
          console.log({ fetchUserDetails: data });
          setSelectedUser(data);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  return (
    <div>
      <Typography.Title level={2}>User</Typography.Title>
      {selectedUser ? (
        <>
          <Descriptions title="User Info" bordered>
            <Descriptions.Item label="Name">
              {selectedUser.name}
            </Descriptions.Item>
            <Descriptions.Item label="Username">
              {selectedUser.username}
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
              {selectedUser.address.city}, {selectedUser.address.zipcode}
            </Descriptions.Item>
            <Descriptions.Item label="Zipcode">
              {selectedUser.address.zipcode}
            </Descriptions.Item>
          </Descriptions>
          <Map data={[selectedUser]} />
        </>
      ) : (
        <Typography.Text>Loading...</Typography.Text>
      )}
    </div>
  );
};

export default UserDetails;
