import { Order } from '../types';
import axios from 'axios';


export const fetchOrderData = (): Promise<Order[]> => {
  return new Promise((resolve, reject) => {
    try {
      axios.get('api/orders')
      .then(response => {
        const data = response.data;
    
        resolve(data?.orders);
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
        reject(error);
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
      reject(error);
      
    }
  
  });
};

export const fetchSpecificOrderData = ({ id }: { id: number }): Promise<Order> => {
  return new Promise((resolve, reject) => {
    try {
      axios.get(`api/orders/${id}`)
      .then(response => {
        const data = response.data;
        resolve(data);
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
        reject(error);
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return reject(error);
      
    }
    
  });
};
