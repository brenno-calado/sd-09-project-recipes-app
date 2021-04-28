import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/MainDrinks.css';

const CARDS_LIMIT = 12;

function MainDrinks() {
  const {
    cocktailRecipes: { recipes },
    redirect,
    showCards,
  } = useContext(RecipesAppContext);
  return (
    <div>
      <Header />
      <BottomMenu />
      { (redirect) && <Redirect to={ `/bebidas/${recipes[0].idDrink}` } /> }
      <div className="main-drinks-container">
        { (showCards) && recipes.map((drink, index) => ((index < CARDS_LIMIT) && (
          <div className="drink-card" data-testid={ `${index}-recipe-card` }>
            <img
              src={ drink.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt={ drink.strDrink }
            />
            <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
          </div>)
        ))}
      </div>
    </div>
  );
}

export default MainDrinks;
