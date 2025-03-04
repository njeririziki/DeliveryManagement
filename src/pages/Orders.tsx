import React, { useEffect, useState } from 'react';
import { Avatar, List, Typography } from 'antd';
import { Order } from '../types';



const fetchOrderData = async (): Promise<Order[]> => {
    try {
      const response = await fetch('api/orders');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
    
      return data?.orders;
    } catch (error) {
      console.error('Failed to fetch data:', error);
        return [];
      }
  };

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
      fetchOrderData().then((data) =>{
         
       return setOrders(data)
      } );
    }, []);


    return ( 
        <div >
            <Typography.Title level={2}>Orders</Typography.Title>
          
           <List
            itemLayout="horizontal"
            dataSource={orders}
            renderItem={(item, index) => (
            <List.Item>
                <List.Item.Meta
                 avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                title={item.customerName}
                description={item.items.join(', ')}
                />
            </List.Item>
            )}
        />  
        </div>
     );
}
 
export default Orders;