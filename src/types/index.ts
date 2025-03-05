

export interface Order {
    id: string;
    customerId: number;
    customerName: string;
    status: string;
    address: string;
    estimatedDelivery: string;
    items: string[];
    location: {
      lat: number;
      lng: number;
    };
  }

 export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
   
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }