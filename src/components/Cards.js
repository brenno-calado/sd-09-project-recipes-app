import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Loading from './Loading';
import './Cards.css';

function Cards(props) {
  const { dataFromApi } = useContext(RecipesContext);
  const { recipes, loading } = dataFromApi;
  const { route } = props;

  const createRecipesCards = (apiRecipes) => {
    const createFoodsCards = () => {
      const maxCardsToRender = 12;
      return loading ? <Loading />
        : apiRecipes.map(({ strMealThumb, strMeal }, index) => (
          index < maxCardsToRender ? (
            <div className="card" data-testid={ `${index}-recipe-card` }>

              <header className="card-header" data-testid={ `${index}-card-name` }>
                <h1>{strMeal}</h1>
              </header>

              <div
                className="card-image"
                src={ strMealThumb }
                data-testid={ `${index}-card-img` }
              >
                <img src={ strMealThumb } className="food-recipe" alt="bebida" />
              </div>
            </div>
          ) : (
            null
          )));
    };
    const createDrinksCards = () => {
      const maxCardsToRender = 12;
      return loading ? <Loading />
        : apiRecipes.map(({ strDrinkThumb, strDrink }, index) => (
          index < maxCardsToRender ? (
            <div className="card" data-testid={ `${index}-recipe-card` }>

              <header className="card-header" data-testid={ `${index}-card-name` }>
                <h1>{strDrink}</h1>
              </header>

              <div
                className="card-image"
                src={ strDrinkThumb }
                data-testid={ `${index}-card-img` }
              >
                <img src={ strDrinkThumb } className="drink-recipe" alt="bebida" />
              </div>
            </div>
          ) : (
            null
          )));
    };

    return route === '/comidas' ? createFoodsCards() : createDrinksCards();
  };

  return (
    createRecipesCards(recipes)
  );
}

export default Cards;
