import React, { useState } from "react";
import {DownOutlined, UpOutlined} from '@ant-design/icons';


interface CollapseProps {
    defaultOpen?: boolean;
    topPart: React.ReactNode;
    children: React.ReactNode;
  }


const CustomCollapse:React.FC<CollapseProps & { defaultOpen?: boolean }> = ({topPart, children, defaultOpen = false}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const toggle = () => setIsOpen(!isOpen);

    return ( 
        <div className="w-full border border-gray-200 rounded-lg " id="collapseExample">
            <div className="flex flex-row justify-between p-4 cursor-pointer" onClick={toggle}>
                {topPart}
               {
                isOpen ? <UpOutlined className="ml-auto"/> : <DownOutlined className="ml-auto"/>
               }
                     
            </div>
            <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4">{children}</div>
      </div>
        </div>
     );
}
 
export default CustomCollapse;