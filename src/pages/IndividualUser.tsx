import React, {  useState } from 'react';
import { Descriptions, Typography } from 'antd';
//import { User } from '../types';

const user ={
        id: 7,
        name: "Kurtis Weissnat",
        username: "Elwyn.Skiles",
        email: "Telly.Hoeger@billy.biz",
        address: {
          street: "Rex Trail",
          suite: "Suite 280",
          city: "Howemouth",
          zipcode: "58804-1099",
          geo: {
            lat: "24.8918",
            lng: "21.8984"
          }
        },
        phone: "210.067.6132",
        website: "elvis.io",
        
      }

const IndividualUser = () => {
  //  const [user, setuser] = useState<User | null>(null);

    return ( 
     <div>
            <Typography.Title level={2}>User</Typography.Title>
            {user ? (

                <Descriptions title="User Info" bordered>
                    <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
                    <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
                    <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
                    <Descriptions.Item label="Website">{user.website}</Descriptions.Item>
                    <Descriptions.Item label="Address">{user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</Descriptions.Item>
                    <Descriptions.Item label="Zipcode">{user.address.zipcode}</Descriptions.Item>
                </Descriptions>
            ) : (
                <Typography.Text>Loading...</Typography.Text>
            )}
     </div>
     );
}
 
export default IndividualUser;