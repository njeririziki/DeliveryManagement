import { createServer, Model, Response } from "miragejs";
import { Order } from "./types";
import { generateOrderLocation } from "./utils/helpers";
import { MapDefaultCenter } from "./utils/constants";
import {users} from "./data/userDummyData";


const orders: Order[] = users.map((user, index) => ({
  id: (index + 1).toString(),
  shipmentId: `GRSWFY0${Math.floor(Math.random() * 1000000).toString()}`,
  customerId: user.id,
  customerName: user.name,
  status: 'In Transit',
  address: `${user.address.street}, ${user.address.city}`,
  estimatedDelivery: `2025-03-${10 + index} ${10 + index}:00`,
  items: ["Laptop", "Phone", "Tablet", "Headphones", "Monitor"].sort(() => Math.random() - 0.5),
  warehouseLocation: { lat: MapDefaultCenter[1], lng: MapDefaultCenter[0] },
  orderLocation: generateOrderLocation(
    { lat: -1.2664, lng: 36.8030 },
    { lat: Number(user.address.geo.lat), lng: Number(user.address.geo.lng) },
    Math.random() * 0.8 + 0.1
  ),
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
