import React from 'react';
import Header from '../Components/Header/index';
import CocktailCards from '../Components/CocktailCards';

class MainDrink extends React.Component {
  render() {
    return (
      <>
        <Header name="Bebidas" />
        <CocktailCards />
      </>
    );
  }
}

export default MainDrink;
