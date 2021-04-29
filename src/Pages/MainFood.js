import React, { Component } from 'react';
import Header from '../Components/Header';
import FoodCards from '../Components/FoodCards';
import Footer from '../Components/Footer';
import ShowCategories from '../Components/ShowCategories';

class MainFood extends Component {
  render() {
    return (
      <>
        <Header name="Comidas" />
        <FoodCards />
        <ShowCategories name="Comidas" />
        <Footer />
      </>
    );
  }
}

export default MainFood;
