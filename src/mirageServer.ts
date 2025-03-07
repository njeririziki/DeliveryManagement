import { createServer, Model, Response } from "miragejs";
import { Order } from "./types";


const users = [
  {
    id: 1,
    name: "Leanne Graham",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      geo: { lat: -37.3159, lng: 81.1496 },
    },
  },
  {
    id: 2,
    name: "Ervin Howell",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      geo: { lat: -43.9509, lng: -34.4618 },
    },
  },
  {
    id: 3,
    name: "Clementine Bauch",
    address: {
      street: "Douglas Extension",
      suite: "Suite 847",
      city: "McKenziehaven",
      geo: { lat: -68.6102, lng: -47.0653 },
    },
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    address: {
      street: "Skiles Walks",
      suite: "Suite 351",
      city: "Roscoeview",
      zipcode: "33263",
      geo: {
        lat: "-31.8129",
        lng: "62.5342"
      }
    },
    phone: "(254)954-1289",
    website: "demarco.info",
    
  },
  {
    id: 6,
    name: "Mrs. Dennis Schulist",
    username: "Leopoldo_Corkery",
    email: "Karley_Dach@jasper.info",
    address: {
      street: "Norberto Crossing",
      suite: "Apt. 950",
      city: "South Christy",
      zipcode: "23505-1337",
      geo: {
        lat: "-71.4197",
        lng: "71.7478"
      }
    },
    phone: "1-477-935-8478 x6430",
    website: "ola.org",
    
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    username: "Elwyn.Skiles",
    email: "Telly.Hoeger@billy.biz",
    address: {
      street: "Rex Trail",
      suite: "Suite 280",
      city: "Howemouth",
      zipcode: "58804-1099",
      geo: {
        lat: "24.8918",
        lng: "21.8984"
      }
    },
    phone: "210.067.6132",
    website: "elvis.io",
    
  },
];

const orders: Order[] = users.map((user, index) => ({
  id: (index + 1).toString(),
  customerId: user.id,
  customerName: user.name,
  status: ["Pending", "Shipped", "In Transit", "Delivered"][
    Math.floor(Math.random() * 4)
  ],
  address: `${user.address.street}, ${user.address.city}`,
  estimatedDelivery: `2025-03-${10 + index} ${10 + index}:00`,
  items: ["Laptop", "Phone", "Tablet", "Headphones", "Monitor"].sort(
    () => Math.random() - 0.5
  ),
 
  warehouseLocation:{lat:-1.2664, lng:36.8030},
  orderLocation: { lat: Number(user.address.geo.lat), lng: Number(user.address.geo.lng) },
  destinationLocation: { lat: Number(user.address.geo.lat), lng: Number(user.address.geo.lng) },

}));

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    models: {
      order: Model.extend<Partial<Order>>({}),
    },

    seeds(server) {
      orders.forEach((order) => server.create("order", order));
    },

    routes() {
      this.namespace = "api";

      this.get("/orders", (schema) => {
        return schema.all("order");
      });

      this.get("/orders/:id", (schema, request) => {
        const id = request.params.id;
        const order = schema.find("order", id);
        return order ? order.attrs : new Response(404, {}, { error: "Order not found" });
      });
      
      this.post("/orders", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create("order", attrs);
      });

      this.passthrough('https://jsonplaceholder.typicode.com/**',
        'https://api.mapbox.com/**',
        'https://api.mapbox.com/styles/v1/**',
        'https://events.mapbox.com/**',
      );
    },
  });


}
