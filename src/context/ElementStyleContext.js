import { createContext, useState, useContext } from 'react';

const ElementStyleContext = createContext();

// Provider component
export const ElementStyleProvider = ({ children }) => {
  const [elementState, setElementState] = useState({ styles: {}, attributes:{} ,elementId: null });

  return (
    <ElementStyleContext.Provider value={{ elementState, setElementState }}>
      {children}
    </ElementStyleContext.Provider>
  );
};

// Custom hook to use the context
export const useElementStyleContext = () => {
  const context = useContext(ElementStyleContext);
  if (!context) {
    throw new Error('useElementStyleContext must be used within an ElementStyleProvider');
  }
  return context;
};