import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {UserContextType, User } from "../types";



// Create the context with a default value
 const UserContext = createContext<UserContextType | null >(null);


  // Create the provider component
  export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
   
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    
    return (
      <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
        {children}    
      </UserContext.Provider>
    );
  };


// Create a custom hook to use the context
export const useSelectedUserDetails = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  
  return context;
};
