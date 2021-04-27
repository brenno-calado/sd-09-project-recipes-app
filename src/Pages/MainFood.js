import Header from '../Components/Header';
import React, { Component } from 'react';
import FoodCards from '../Components/FoodCards';

class MainFood extends Component {
  render() {
    return (
      <>
        <Header name="Comidas" />
        <FoodCards />
      </>
    );
  }
}

export default MainFood;
