import React, { createContext, useContext, useState } from 'react';

// Create Ideas Context
const IdeasContext = createContext();

// Hook to use the Ideas context
export const useIdeas = () => {
  return useContext(IdeasContext);
};

// Provider component
export const IdeasProvider = ({ children }) => {
  const [ideas, setIdeas] = useState([]);

  // Function to add new ideas
  const addIdea = (newIdea) => {
    setIdeas([...ideas, newIdea]);
  };

  return (
    <IdeasContext.Provider value={{ ideas, addIdea }}>
      {children}
    </IdeasContext.Provider>
  );
};
