import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardRecipeMeal from '../../Components/CardRecipeMeal.js/CardRecipeMeal';
import Header from '../../Components/Header/Header';
import { RecipeContext } from '../../Context';

function ExploreForArea() {
  const {
    recipies,
    setRecipies,
    typeRecipies,
    setTypeRecipies } = useContext(RecipeContext);
  const [areaOptions, setAreaOptions] = useState([]);

  useEffect(() => {
    if (areaOptions.length === 0) {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        .then((response) => response.json())
        .then((result) => setAreaOptions(result.meals.map((area) => area.strArea)));
    }
    setTypeRecipies('comidas');
  });

  useEffect(() => {
    if (recipies.length === 0) {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((result) => setRecipies(result.meals));
    }
  });

  const handleAreaFilter = ({ target: { value } }) => {
    if (value === 'All') {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((result) => setRecipies(result.meals));
      return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`)
      .then((response) => response.json())
      .then((result) => setRecipies(result.meals));
  };

  return (
    <div>
      <Header title="Explorar Origem" />
      <select data-testid="explore-by-area-dropdown" onChange={ handleAreaFilter }>
        <option data-testid="All-option" value="All">All</option>
        { (areaOptions.length > 0) && areaOptions.map((option) => (
          <option
            key={ option }
            data-testid={ `${option}-option` }
            value={ option }
          >
            {option}
          </option>
        ))}
      </select>
      <div className="list-meal-container">
        {(recipies.length > 0 && typeRecipies === 'comidas') && recipies
          .map((recipe, index) => (index < '12')
          && (
            <Link key={ recipe.strMeal } to={ `/comidas/${recipe.idMeal}` }>
              <CardRecipeMeal
                recipe={ recipe }
                index={ index }
                key={ recipe.strMeal }
              />
            </Link>))}
      </div>
    </div>
  );
}

export default ExploreForArea;
