import React from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';

function Perfil() {
  return (
    <div>
      <Header title="Perfil" showButton={ false } />
      <Footer />
    </div>
  );
}

export default Perfil;
