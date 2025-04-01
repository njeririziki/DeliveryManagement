import { Modal } from "antd";
import React, { useState } from "react";
import StandardButton from "../custom/StandardButton";

interface CreateEditOrderProps {
    name?: string;
    marker?: React.ReactNode; 
}

const CreateEditOrder: React.FC<CreateEditOrderProps> = ({name,marker}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    return ( 
        <div>
          <div  onClick={showModal} >
          {marker ? marker : 
             <StandardButton name={name? name:'Create Order'}  onClick={showModal} />
          }
          </div>
         <Modal
        title="Order Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        >
            <form className="grid grid-cols-2 gap-4">
                <label>Order Name</label>
                <input type="text" placeholder="Order Name" />
                <label>Order Description</label>
                <input type="text" placeholder="Order Description" />
                <label>Order Price</label>
                <input type="text" placeholder="Order Price" />
              
            </form>
            </Modal>
        </div>
     );
}
 
export default CreateEditOrder;