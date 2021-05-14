import React from 'react';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import Buttons from '../components/ExploreButtons';
import '../styles/pages/Explore.css';

function ExploreFoods() {
  return (
    <div>
      <Header />
      <div className="explore-container">
        <Buttons origin />
      </div>
      <BottomMenu />
    </div>
  );
}

export default ExploreFoods;
