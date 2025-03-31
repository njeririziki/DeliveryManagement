import { Descriptions } from "antd";
import CustomCollapse from '../custom/CustomCollapse'; 
import {User} from '../../types'
import userAvatars from '../../data/userAvatars'

interface UserCollapseProps {
   openOrder: boolean;
    selectedUser:User,
    actions: React.ReactNode;
}

const UserCollapse:React.FC<UserCollapseProps>= ({openOrder, selectedUser, actions}) => {
    return (
        <div>
             <CustomCollapse
              defaultOpen={openOrder}
              topPart={
                <div className="flex flex-row  items-center gap-4">
                  <img
                    src={userAvatars[selectedUser.id - 1].src}
                    alt={userAvatars[selectedUser.id - 1].alt}
                    className="bg-gray-100 rounded-full w-16 h-16"
                  />
                  <div className="flex flex-col ">
                    <p>Username </p>
                    <p className="font-semibold"> {selectedUser.username}</p>
                  </div>
                </div>
              }
            >
              <div className=" flex border-t border-gray-200 pt-4 flex-row  ">
                <Descriptions title="User Info" column={1}>
                  <Descriptions.Item label="Name">
                    {selectedUser.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {selectedUser.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone">
                    {selectedUser.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label="Website">
                    {selectedUser.website}
                  </Descriptions.Item>
                  <Descriptions.Item label="Address">
                    {selectedUser.address.street}, {selectedUser.address.suite},{" "}
                    {selectedUser.address.city}
                  </Descriptions.Item>
                  <Descriptions.Item label="Zipcode">
                    {selectedUser.address.zipcode}
                  </Descriptions.Item>
                </Descriptions>
                <div className="text-xs bg-green-50 text-green-500 border border-green-300 p-2 h-fit text-nowrap rounded-full ">
                  {"Active"}
                </div>
                <div>
                    {actions}
                   </div>
              </div>
            </CustomCollapse>
        </div>
      );
}
 
export default UserCollapse;