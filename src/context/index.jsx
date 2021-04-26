import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services';

const context = createContext();

function Provider({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchApi('food', 'letters', 'l');
  }, []);

  const value = {
    data,
    setData,
    isLoading,
    setLoading,
  };

  return (
    <context.Provider value={ value }>
      { children }
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {
  context,
  Provider,
};
