import React, { useEffect, useState } from 'react';
import { Descriptions, Typography } from 'antd';
import { Order } from '../types';

const fetchSpecificOrderData = async (id: number): Promise<Order> => {
    try {
        const response = await fetch(`api/orders/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
    console.log({data});
    
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return {} as Order;
    }
};

const OrderDetails= () => {
 
    const id=1;
    const [order, setOrder] = useState<Order | null>(null)

    useEffect(() => {
    fetchSpecificOrderData(id).then((data) =>{
       
        return setOrder(data);
    } );
        
    }, [])
    
    return ( 
        <div>
            <Typography.Title level={2}>Order</Typography.Title>
            {order ? (
                <Descriptions title="Order Info" bordered>
                    <Descriptions.Item label="Customer">{order.customerName}</Descriptions.Item>
                    <Descriptions.Item label="Status">{order.status}</Descriptions.Item>
                    <Descriptions.Item label="Address">{order.address}</Descriptions.Item>
                    <Descriptions.Item label="Estimated Delivery">{order.estimatedDelivery}</Descriptions.Item>
                    <Descriptions.Item label="Items">{order.items.join(',')}</Descriptions.Item>
                    {/* <Descriptions.Item label="Location">{order}</Descriptions.Item> */}
                </Descriptions>
            ) : (
                <Typography.Text>Loading...</Typography.Text>
            )}
        </div>
     );
}
 
export default OrderDetails;