import React from 'react';
import ExploreButtonsFoods from '../components/ExploreButtonsFoods';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/ExploreFoods.css';

const ExploreFoods = () => (
  <div className="explore-foods-body">
    <Header title="Explorar Comidas" />
    <ExploreButtonsFoods />
    <Footer />
  </div>
);

export default ExploreFoods;
