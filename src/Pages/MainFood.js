import React, { Component } from 'react';
import Header from '../Components/Header';
import FoodCards from '../Components/FoodCards';
import ShowArea from '../Components/ShowArea';
import Footer from '../Components/Footer';

class MainFood extends Component {
  render() {
    return (
      <>
        <Header name="Comidas" />
        <FoodCards />
        <ShowArea />
        <Footer />
      </>
    );
  }
}

export default MainFood;
