import React, { useEffect, useState } from 'react';
import { Avatar, List, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Order } from '../types';
import { fetchOrderData } from '../services/OrderService';



const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
      fetchOrderData().then((data: Order[]) =>{  
        console.log({data});
        
       return setOrders(data);
      });
     }, []);

    


    const handleNavigation = (orderId: string)  => {
      // Implement navigation logic here, e.g., using react-router
      console.log(`Navigating to order details for order ID: ${orderId}`);
      navigate(`/orders/${orderId}`)
    };

    return ( 
        <div >
            <Typography.Title level={2}>Orders</Typography.Title>
          
           <List
            itemLayout="horizontal"
            dataSource={orders}
            renderItem={(item, index) => (
            <List.Item
            actions={[<a key="list-loadmore-more" onClick={()=>handleNavigation(item.id)}>more</a>]}
            >
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