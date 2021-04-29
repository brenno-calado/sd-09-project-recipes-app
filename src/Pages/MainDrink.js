import React from 'react';
import Header from '../Components/Header';
import CocktailCards from '../Components/CocktailCards';
import ShowCategories from '../Components/ShowCategories';
import Footer from '../Components/Footer';

class MainDrink extends React.Component {
  render() {
    return (
      <>
        <Header name="Bebidas" />
        <CocktailCards />
        <ShowCategories name="Bebidas" />
        <Footer />
      </>
    );
  }
}

export default MainDrink;
