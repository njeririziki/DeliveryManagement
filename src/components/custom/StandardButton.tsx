

import React from 'react';

interface StandardButtonProps {
    name: string;
    type?: 'button' | 'submit' | 'reset';
    icon?: React.ReactElement | null;
    onClick?: () => void;
    customStyles?: string | null;
}

const StandardButton: React.FC<StandardButtonProps> = ({name, icon, onClick,type, customStyles}) => {
    return ( 
        <button 
        type={type ? type : 'button'}
        className={`${customStyles ? customStyles : 'bg-blue-500 hover:bg-blue-700 text-white'} flex flex-row gap-4 justify-center font-bold py-2 px-4 rounded`}
            onClick={onClick}
            >
              {icon && icon}  {name}
        </button>
    );
}
 
export default StandardButton;