import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import FoodCard from '../Components/FoodCards';

class ExploreFoodByArea extends React.Component {
  render() {
    return (
      <div>
        <Header name="Explorar Origem" />
        <FoodCard />
        <Footer />
      </div>
    );
  }
}

export default ExploreFoodByArea;
