import React, {  useState } from 'react';
import { Descriptions, Typography } from 'antd';
import { User } from '../types';

const IndividualUser = () => {
    const [user, setuser] = useState<User | null>(null);

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
                    <Descriptions.Item label="Company">{user.company.name}</Descriptions.Item>
                </Descriptions>
            ) : (
                <Typography.Text>Loading...</Typography.Text>
            )}
     </div>
     );
}
 
export default IndividualUser;