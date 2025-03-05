import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types";

// Define the context type
interface UserContextType {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}

// Create the context with a default value
const SelectedUserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
  }
  
  // Create the provider component
  export const UserProvider: React.FC<UserProviderProps> = ({ children }): React.ReactElement => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
    return (
      <SelectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
        {children}
      </SelectedUserContext.Provider>
    );
  };


// Create a custom hook to use the context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
