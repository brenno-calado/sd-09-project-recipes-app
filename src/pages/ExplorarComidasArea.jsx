import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FoodCards from '../components/FoodCards';
import Footer from '../components/Footer';
import { getAreaList, getMealsByName } from '../services/MealFetch';
import '../styles/recipes.css';

function ExplorarComidasArea() {
  const [listByArea, setListByArea] = useState([]);
  // const [filter, setFilter] = useState(false);

  useEffect(() => {
    getAreaList().then((response) => setListByArea(response));
    getMealsByName();
  }, []);

  // function handleChange(area) {
  //   getByArea(area).then((response) => setFoods(response));
  // }

  return (
    <>
      <Header textProp="Explorar Origem" />

      <select className="select" data-testid="explore-by-area-dropdown">
        <option data-testid="All-option">All</option>
        {listByArea.map((local) => (
          <option
            key={ Math.random() }
            data-testid={ `${local.strArea}-option` }
          >
            { local.strArea }
          </option>
        ))}
      </select>

      <FoodCards />

      <Footer />
    </>
  );
}

export default ExplorarComidasArea;
