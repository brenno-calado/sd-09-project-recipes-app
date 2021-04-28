import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Explore() {
  const { setHeader } = useContext(AppContext);
  useEffect(() => {
    setHeader({ page: 'Explorar', search: false });
  }, [setHeader]);

  return (
    <div>
      <Header />
    </div>
  );
}

export default Explore;
