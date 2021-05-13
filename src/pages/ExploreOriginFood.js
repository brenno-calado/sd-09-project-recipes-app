import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';
import { useRecipeContext } from '../contexts/recipeContext';
import RecipeCard from '../components/RecepiCard';
import styles from '../utils/headerRenderFoodAndDrinks.module.css';

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
    <div className={ styles.container }>
      <HeaderFoods hasSearchBar={ false }>
        <h2 data-testid="page-title">Explorar Origem</h2>
      </HeaderFoods>
      <div>
        <select
          className={ styles.selectedOrigin }
          data-testid="explore-by-area-dropdown"
          onChange={ handleChange }
        >
          <option
            className={ styles.options }
            value="All"
            data-testid="All-option"
          >
            All

          </option>
          { foodLocations.map(({ strArea, idMeal }) => (
            <option
              className={ styles.options }
              key={ idMeal }
              value={ strArea }
              data-testid={ `${strArea}-option` }
            >
              { strArea }
            </option>
          )) }
        </select>
      </div>

      {
        initFood.length ? (
          <div className={ styles.contentContainer }>
            {initFood
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
              ))}
          </div>)
          : (
            <Spinner className={ styles.sniper } animation="grow" variant="danger">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )

      }
      <BottomMenu />
    </div>
  );
}

export default ExploreOriginFood;
