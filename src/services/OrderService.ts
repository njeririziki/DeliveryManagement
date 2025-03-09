import { Order } from '../types';
import axios from 'axios';


export const fetchOrderData = async (): Promise<Order[]> => {
  try {
    const response = await axios.get('api/orders');
    const data = response.data;
    console.log({ data });

    return data?.orders;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
};

export const fetchSpecificOrderData = async ({ id }: { id: number }): Promise<Order> => {
  try {
    const response = await axios.get(`api/orders/${id}`);
    const data = response.data;

    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return {} as Order;
  }
};
