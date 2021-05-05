import React from 'react';
import ExploreButtonsDrinks from '../components/ExploreButtonsDrinks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/ExploreBeverages.css';

const ExploreBeverages = () => (
  <div className="explore-beverages-body">
    <Header title="Explorar Bebidas" />
    <ExploreButtonsDrinks />
    <Footer />
  </div>
);

export default ExploreBeverages;
