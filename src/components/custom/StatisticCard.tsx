import React from "react";

interface StaticCardProps {
    title: string;
    card: Array<{
        icon: React.ReactNode;
        category: string;
        value: number | string;
    }>;
}

const StaticCard = ({title, card}: StaticCardProps) => {
    return (
        <div className="w-full" >
            <p className="text-md font-semibold mb-2"> {title}</p>
        <div className='w-full border border-gray-200 flex flex-row bg-white p-4 rounded-lg '>
          {card.map((data, index) => (
              <div key={index} className={`w-1/2 flex flex-col gap-2  
               pr-4 ${index === 0 ? 'border-r border-gray-200' : 'ml-4'}`} >
                <div className="flex flex-row gap-2 items-center">
                    {data.icon}
                    <p className='text-sm '>{data.category}</p>
                    {/* <p className='text-sm text-gray-500'></p> */}
                </div>
              
                    <p className='text-sm font-medium '>{data.value}</p>
               
            
            </div>
          )
            )}
            </div>
            </div>
      );
}
 
export default StaticCard;