import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Food() {
  const { setHeader } = useContext(AppContext);
  useEffect(() => {
    setHeader({ page: 'Comidas', search: true });
  }, [setHeader]);

  return (
    <div>
      <Header />
    </div>
  );
}
export default Food;
