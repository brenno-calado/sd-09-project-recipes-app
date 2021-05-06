import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Loading from './Loading';
import './Cards.css';

function Cards(props) {
  const { dataFromApi } = useContext(RecipesContext);
  const { recipes, loading } = dataFromApi;
  const { route } = props;
  console.log(recipes);
  const createRecipesCards = (apiRecipes) => {
    const createFoodsCards = () => {
      const maxCardsToRender = 12;
      return loading ? <Loading />
        : apiRecipes.map(({ strMealThumb, strMeal }, index) => (
          index < maxCardsToRender ? (
            <div
              key={ index }
              className="card-container"
              data-testid={ `${index}-recipe-card` }
            >
              <header className="card-header" data-testid={ `${index}-card-name` }>
                <p className="recipes-title">{strMeal}</p>
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
            <div
              key={ index }
              className="card-container"
              data-testid={ `${index}-recipe-card` }
            >
              <header className="card-header" data-testid={ `${index}-card-name` }>
                <p>{strDrink}</p>
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
    <div className="main-content">
      {createRecipesCards(recipes)}
    </div>
  );
}

export default Cards;
