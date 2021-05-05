import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/MainPage.css';

const CARDS_LIMIT = 12;
const BUTTONS_LIMIT = 5;

function MainDrinks() {
  const {
    cocktailsRecipes,
    redirect,
    isFetching,
    cocktailsCategories,
    handleCocktailCategoryClick,
  } = useContext(RecipesAppContext);
  return (
    <>
      <Header />
      <div className="main-page-container">
        { (redirect) && <Redirect to={ `/bebidas/${cocktailsRecipes[0].idDrink}` } /> }
        { !(isFetching) && (
          <div className="categories-buttons-container">
            <button
              type="button"
              data-testid="All-category-filter"
              onClick={ handleCocktailCategoryClick }
            >
              All
            </button>
            { cocktailsCategories
              .map(({ strCategory }, index) => (index < BUTTONS_LIMIT) && (
                <button
                  type="button"
                  data-testid={ `${strCategory}-category-filter` }
                  key={ `${strCategory}-category-filter` }
                  onClick={ handleCocktailCategoryClick }
                >
                  { strCategory }
                </button>
              )) }
          </div>
        ) }
        { (!(isFetching) && (cocktailsRecipes !== null)) && (
          <div className="recipes-container">
            { cocktailsRecipes.map((drink, index) => ((index < CARDS_LIMIT) && (
              <Link
                to={ `/bebidas/${drink.idDrink}` }
                key={ `${index}-recipe-card` }
              >
                <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
                  <img
                    src={ drink.strDrinkThumb }
                    data-testid={ `${index}-card-img` }
                    alt={ drink.strDrink }
                  />
                  <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
                </div>
              </Link>)
            )) }
          </div>
        ) }
        { (!(isFetching) && cocktailsRecipes === null) && (
          <p className="not-found-message">Drink Not Found</p>
        ) }
        { (isFetching) && (
          <p
            className="loading-message"
            data-testid="loading-message"
          >
            Loading...
          </p>
        ) }
      </div>
      <BottomMenu />
    </>
  );
}

export default MainDrinks;
