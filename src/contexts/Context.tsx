import React, { createContext } from 'react';

interface ContextProviderData {
  children: React.ReactNode;
}

export const Context = createContext({});

export function ContextProvider({ children }: ContextProviderData) {


  return (
    <Context.Provider value="">
      { children }
    </Context.Provider>
  );
}
