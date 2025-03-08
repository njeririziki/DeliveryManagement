import React, { createContext, useContext, useState, ReactNode, FC, useEffect } from "react";

// Define the shape of the error context
interface ErrorContextType {
  error: string| null;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Create the context with a default value
const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

// Define the props for ErrorProvider
interface ErrorProviderProps {
  children: ReactNode;
}

// Create the provider component
export const ErrorProvider: FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  useEffect(() => {
  console.log("Error:", error);
  
  }, [error]);

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

// Create a custom hook to use the context
export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};
