import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Loading from './Loading';
import './Cards.css';

function Cards(props) {
  const { dataFromApi } = useContext(RecipesContext);
  const { recipes, loading } = dataFromApi;
  const { route, history, pathname } = props;

  const handleClick = (id) => {
    history.push(`${pathname}/${id}`);
  };

  console.log(pathname);

  const createFoodsCards = (apiRecipes) => {
    const maxCardsToRender = 12;
    return loading ? <Loading />
      : apiRecipes.map(({ strMealThumb, strMeal, idMeal }, index) => (
        index < maxCardsToRender ? (
          <button type="button" onClick={ () => handleClick(idMeal) }>
            <div className="card" key={ index } data-testid={ `${index}-recipe-card` }>
              <header className="card-header" data-testid={ `${index}-card-name` }>
                <h1>{strMeal}</h1>
              </header>

              <div
                className="card-image"
                src={ strMealThumb }
              >
                <img
                  className="food-recipe"
                  src={ strMealThumb }
                  alt="bebida"
                  data-testid={ `${index}-card-img` }
                />
              </div>
            </div>
          </button>
        ) : (
          null
        )));
  };
  const createDrinksCards = (apiRecipes) => {
    const maxCardsToRender = 12;
    return loading ? <Loading />
      : apiRecipes.map(({ strDrinkThumb, strDrink, idDrink }, index) => (
        index < maxCardsToRender ? (
          <button type="button" onClick={ () => handleClick(idDrink) }>
            <div className="card" data-testid={ `${index}-recipe-card` }>

              <header className="card-header" data-testid={ `${index}-card-name` }>
                <h1>{strDrink}</h1>
              </header>

              <div
                className="card-image"
                src={ strDrinkThumb }
              >
                <img
                  src={ strDrinkThumb }
                  className="drink-recipe"
                  alt="bebida"
                  data-testid={ `${index}-card-img` }
                />
              </div>
            </div>
          </button>
        ) : (
          null
        )));
  };

  const createRecipesCards = (apiRecipes) => (
    route === '/comidas'
      ? createFoodsCards(apiRecipes || [])
      : createDrinksCards(apiRecipes)
  );

  return (
    createRecipesCards(recipes)
  );
}

export default Cards;
