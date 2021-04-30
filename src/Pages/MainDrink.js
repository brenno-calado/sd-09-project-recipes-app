import React from 'react';
import Header from '../Components/Header';
import CocktailCards from '../Components/CocktailCards';
import Footer from '../Components/Footer';

class MainDrink extends React.Component {
  render() {
    return (
      <>
        <Header name="Bebidas" />
        <CocktailCards />
        <Footer />
      </>
    );
  }
}

export default MainDrink;
