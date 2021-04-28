import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/MainFoods.css';

const CARDS_LIMIT = 12;

function MainFoods() {
  const {
    mealRecipes: { recipes },
    redirect,
    showCards,
  } = useContext(RecipesAppContext);
  return (
    <div>
      <Header />
      <BottomMenu />
      { (redirect) && <Redirect to={ `/comidas/${recipes[0].idMeal}` } /> }
      <div className="main-foods-container">
        { (showCards) && recipes.map((meal, index) => ((index < CARDS_LIMIT) && (
          <div
            className="food-card"
            data-testid={ `${index}-recipe-card` }
            key={ `${index}-recipe-card` }
          >
            <img
              src={ meal.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt={ meal.strMeal }
            />
            <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
          </div>)
        ))}
      </div>
    </div>
  );
}

export default MainFoods;
