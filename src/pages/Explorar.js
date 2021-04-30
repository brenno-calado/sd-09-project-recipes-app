import React from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';

function Explorar() {
  return (
    <div>
      <Header title="Explorar" showButton={ false } />
      <Footer />
    </div>
  );
}

export default Explorar;
