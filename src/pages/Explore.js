import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Explore extends React.Component {
  render() {
    return (
      <div>
        <Header title="Explorar" />
        <p>Esta é a pagina de explorar.</p>
        <Footer />
      </div>
    );
  }
}

export default Explore;
