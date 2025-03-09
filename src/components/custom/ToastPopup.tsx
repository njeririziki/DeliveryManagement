import React from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-x-0 top-0 mt-4 flex items-center justify-center bg-opacity-50 transition-opacity
         ${isOpen ? "opacity-100 visible" : "opacity-0 invisible" }`
      }
    >
      <div
        className={`bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full relative transform transition-all duration-300 ${
          isOpen ? "scale-100" : "scale-75"
        }`}
      >
        <p
          className="absolute mr-2 top-2 right-2 bg-white text-sm text-black hover:text-black"
          onClick={onClose}
        >
          ✖
        </p>
        {children}
      </div>
    </div>
  );
};

export default Popup;


// className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity
//   ${isOpen ? "opacity-100 visible" : "opacity-0 invisible" }`
// }
