import {  useEffect, useState } from 'react';
import { User } from '../types';
import { Avatar, List, Typography } from 'antd';

const fetchUserData = async (): Promise<User[]> => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
     
      return data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
        return [];
      }
  };

const UsersTable = () => {

    const [userData, setUserData] = useState<User[]>([])

    useEffect(() => {
        fetchUserData()
        .then(data => {
          console.log({fetchUserData:data})
          setUserData(data)
        })
        .catch(error => console.error(error))
    }, [])

    return ( 
         <div>
             <Typography.Title level={2}>Users</Typography.Title>
          
          <List
           itemLayout="horizontal"
           dataSource={userData}
           renderItem={(item, index) => (
           <List.Item>
               <List.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
               title={item.name}
               description={item.email}
               />
           </List.Item>
           )}
       /> 
         </div>
     );
}
 
export default UsersTable;