import React from 'react';
import Header from '../components/Header';
import Explorer from '../components/Explorer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';

function Explorar() {
  return (
    <div>
      <Header title="Explorar" showExplorerButton={ false } />
      <Explorer type="global" />
      <Footer />
    </div>
  );
}

export default Explorar;
