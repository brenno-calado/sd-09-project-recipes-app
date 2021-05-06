import React, { useState, useEffect } from 'react';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';
import { useRecipeContext } from '../contexts/recipeContext';
import RecipeCard from '../components/RecepiCard';

function ExploreOriginFood() {
  const { getRecipesByLocations, getLocations, getRecipes } = useRecipeContext();
  const [initFood, setInitFood] = useState([]);
  const [foodLocations, setLocations] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('All');
  const twelve = 12;
  const type = 'comidas';

  function handleChange({ target }) {
    setSelectedCountry(target.value);
  }

  useEffect(() => {
    getRecipesByLocations('themealdb', selectedCountry)
      .then(({ meals }) => setInitFood(meals || []));
  }, [getRecipesByLocations, selectedCountry]);

  useEffect(() => {
    getLocations('themealdb')
      .then(({ meals }) => setLocations(meals));
  }, [getLocations]);

  useEffect(() => {
    getRecipes('themealdb')
      .then(({ meals }) => (
        selectedCountry === 'All' && setInitFood(meals)));
  }, [selectedCountry, getRecipes]);

  return (
    <>
      <HeaderFoods hasSearchBar>
        <h1 data-testid="page-title">Explorar Origem</h1>
      </HeaderFoods>
      <div>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ handleChange }
        >
          { foodLocations.map(({ strArea, idMeal }) => (
            <option
              key={ idMeal }
              value={ strArea }
              data-testid={ `${strArea}-option` }
            >
              { strArea }
            </option>
          )) }
          <option value="All" data-testid="All-option">All</option>
        </select>
      </div>
      {
        (initFood
          .map(({ idMeal, strMealThumb, strMeal }, index) => index < twelve && (
            <RecipeCard
              key={ idMeal }
              image={ strMealThumb }
              name={ strMeal }
              recipeCArdId={ `${index}-recipe-card` }
              cardImageId={ `${index}-card-img` }
              cardNameId={ `${index}-card-name` }
              type={ type }
              codeId={ idMeal }
            />
          )))
      }
      <BottomMenu />
    </>
  );
}

export default ExploreOriginFood;
