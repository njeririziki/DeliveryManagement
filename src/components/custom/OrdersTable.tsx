import type { TableColumnsType } from "antd";
import { Table } from "antd";
import { Order } from "../../types";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderData } from "../../services/OrderService";



const columns: TableColumnsType<Order> = [
  { title: "Tracking ID", dataIndex: "shipmentId", key: "shipmentId" },
  { title: "Customer Name", dataIndex: "customerName", key: "customerName" },
  {
    title: "Estimated Delivery",
    dataIndex: "estimatedDelivery",
    key: "estimatedDelivery",
  },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Address", dataIndex: "address", key: "address" },
  { title: "Items", dataIndex: "items", key: "items" },
];

const OrdersTable = () => {
  const { data: orderData } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrderData,
  });

  const navigate = useNavigate();
  //record: Order
  const handleOrderSelection = () => {
    navigate(`/orderDetails`); ///${record.id}
  };

  return (
    <div>
      <Table<Order>
        columns={columns}
        dataSource={orderData}
        showSorterTooltip={{ target: "sorter-icon" }}
        onRow={() => {
          return {
            onClick: () => handleOrderSelection(),
          };
        }}
      />
    </div>
  );
};

export default OrdersTable;
