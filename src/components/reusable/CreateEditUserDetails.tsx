import { Modal } from "antd";
import React, { useState } from "react";
import StandardButton from "../custom/StandardButton";

interface CreateEditUserProps {
    name?: string;
    marker?: React.ReactNode; 
}

const CreateEditUserDetails : React.FC<CreateEditUserProps> = ({name,marker})=> {
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
                <label>First Name</label>
                <input type="text" placeholder="First Name" />
                <label>Last Name</label>
                <input type="text" placeholder="Last Name" />
                <label>Email</label>
                <input type="text" placeholder="Email" />
                <label>Phone</label>
                <input type="text" placeholder="Phone" />
                <button>Submit</button>
            </form>
            </Modal>
        </div>
     );
}
 
export default CreateEditUserDetails;