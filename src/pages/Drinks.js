import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Drinks() {
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <div>
      <Header title="Bebidas" />
      {pathname === '/bebidas' ? <Footer /> : null}
    </div>
  );
}

export default Drinks;
