import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/MainPage.css';

const CARDS_LIMIT = 12;
const BUTTONS_LIMIT = 5;

function MainFoods() {
  const {
    mealsRecipes,
    mealsCategories,
    redirect,
    isFetching,
    handleMealCategoryClick,
  } = useContext(RecipesAppContext);
  return (
    <>
      <Header />
      <div className="main-page-container">
        { (redirect) && <Redirect to={ `/comidas/${mealsRecipes[0].idMeal}` } /> }
        { !(isFetching) && (
          <div className="categories-buttons-container">
            <button
              type="button"
              data-testid="All-category-filter"
              onClick={ handleMealCategoryClick }
            >
              All
            </button>
            { mealsCategories
              .map(({ strCategory }, index) => (index < BUTTONS_LIMIT) && (
                <button
                  type="button"
                  data-testid={ `${strCategory}-category-filter` }
                  key={ `${strCategory}-category-filter` }
                  onClick={ handleMealCategoryClick }
                >
                  { strCategory }
                </button>)) }
          </div>
        ) }
        { (!(isFetching) && (mealsRecipes !== null)) && (
          <div className="recipes-container">
            { mealsRecipes.map((meal, index) => ((index < CARDS_LIMIT) && (
              <Link
                to={ `/comidas/${mealsRecipes[0].idMeal}` }
                key={ `${index}-recipe-card` }
              >
                <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
                  <img
                    src={ meal.strMealThumb }
                    data-testid={ `${index}-card-img` }
                    alt={ meal.strMeal }
                  />
                  <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
                </div>
              </Link>)
            )) }
          </div>
        ) }
        { (!(isFetching) && mealsRecipes === null) && (
          <p className="not-found-message">Meal Not Found</p>
        ) }
        { (isFetching) && (<p className="loading-message">Loading...</p>) }
      </div>
      <BottomMenu />
    </>
  );
}

export default MainFoods;
