

export interface Order {
    id: string;
    shipmentId: string;
    customerId: number;
    customerName: string;
    status: string;
    address: string;
    estimatedDelivery: string;
    items: string[];
    warehouseLocation: {
      lat: number;
      lng: number;
    };
    orderLocation: {
      lat: number;
      lng: number;
    };
    destinationLocation: {
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

  export interface Feature {
    featureName: string;
    avatar: string;
    ordercoordinates?: [number, number];
    coordinates: [number, number];
    type: string;
    address: string;
  }

  export interface OrderFeature {
    featureName: string;
    avatar: string;
    warehouseCoordinates: [number, number];
    orderCoordinates?: [number, number];
    destinationCoordinates: [number, number];
    address: string;
  }
 
  