import React, { createContext, useContext, useState } from "react";

// Cria o contexto
const NavigationContext = createContext();

// Cria um provedor para o contexto
export const NavigationProvider = ({ children }) => {
  const [fromMenu, setFromMenu] = useState(false);
  const [navigationSource, setNavigationSource] = useState(null);
  return (
    <NavigationContext.Provider
      value={{ navigationSource, setNavigationSource }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

// Hook para usar o contexto
export const useNavigation = () => useContext(NavigationContext);
