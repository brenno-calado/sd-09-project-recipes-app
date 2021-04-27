import React, { createContext } from 'react';

export const Context = createContext({});

export function ContextProvider({ children }) {
  return (
    <Context.Provider>
      { children }
    </Context.Provider>
  );
}