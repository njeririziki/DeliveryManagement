import { Order } from '../types';



export const fetchOrderData = async (): Promise<Order[]> => {
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

export const fetchSpecificOrderData = async ({ id }: { id: number }): Promise<Order> => {
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