import { Descriptions } from "antd";
import CustomCollapse from '../custom/CustomCollapse'; 
import Package from '../../assets/package.jpg'; 
import { Order } from "../../types";

interface OrderCollapseProps {
  openOrder: boolean;
  order: Order;
  actions: React.ReactNode;
}

const OrderCollapseComponent: React.FC<OrderCollapseProps> = ({ openOrder, order, actions }) => {
    return ( 
        <div>
             <CustomCollapse
                defaultOpen={openOrder}
                topPart={
                  <div className="flex flex-row  items-center gap-4"
                   >
                    <img
                      src={Package}
                      className="bg-gray-100 rounded-full w-16 h-16"
                    />
                    <div className="flex flex-col ">
                      <p>Shipment ID </p>
                      <p className="font-semibold"> {order.shipmentId}</p>
                    </div>
                  </div>
                }
              >
                <div className=" flex border-t border-gray-200 pt-4 flex-row  ">
                  <Descriptions title="Order Info" column={1}>
                    <Descriptions.Item label="Estimated Delivery">
                      {order.estimatedDelivery}
                    </Descriptions.Item>
                    <Descriptions.Item label="Customer">
                      {order.customerName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address">
                      {order.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Items">
                      {order.items.join(", ")}
                    </Descriptions.Item>
                  </Descriptions>
                   <div>
                    {actions}
                   </div>
                 
                </div>
              </CustomCollapse>
        </div>
     );
}
 
export default OrderCollapseComponent;