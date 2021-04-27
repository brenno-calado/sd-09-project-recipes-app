import React from 'react';
import PropTypes from 'prop-types';
import MyContext from './context';

const Provider = ({ children }) => {
  // [user, setUser] = useState('');

  const providerData = {
    // user,
    // setUser,
  };

  return (
    <MyContext.Provider value={ providerData }>
      {children}
    </MyContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
