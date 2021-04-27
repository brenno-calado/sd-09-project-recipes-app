import React from 'react';
import Header from '../components/Header';

const Meals = ({ location }) => {
  const { pathname } = location;
  return (
    <div>
      <Header />
    </div>
  );
};

export default Meals;
