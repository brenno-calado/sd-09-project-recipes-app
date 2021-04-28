import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services';

const context = createContext();

function Provider({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [authLogin, setAuthLogin] = useState({});
  const [formValidation, setFormValidation] = useState(false);

  useEffect(() => {
    fetchApi('food', 'details', '52843');
  }, []);

  const value = {
    data,
    setData,
    isLoading,
    setLoading,
    authLogin,
    setAuthLogin,
    formValidation,
    setFormValidation,
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
