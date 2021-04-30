import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Header from '../components/Header';
import RecipesAppContext from '../context/RecipesAppContext';

function DrinkDetails() {
  const {
    isFetching,
    drinkId,
    getDrinkId,
    mealRecomendation,
  } = useContext(RecipesAppContext);

  const location = useLocation();
  const id = location.pathname.split('bebidas/', 2)[1];
  const maxRecomendations = 6;
  console.log(mealRecomendation);

  useEffect(() => {
    getDrinkId(id);
  }, [getDrinkId, id]);

  const ingredientsList = () => {
    const list = [];

    for (let index = 1; drinkId[`strIngredient${index}`] !== ''; index += 1) {
      list.push(`
        ${drinkId[`strIngredient${index}`]} - ${drinkId[`strMeasure${index}`]}
      `);
    }
    return list;
  };

  return (
    <div>
      <Header />
      { (!(isFetching) && (drinkId !== null)) && (
        <div>
          <img
            data-testid="recipe-photo"
            alt={ drinkId.strMeal }
            src={ drinkId.strMealThumb }
          />
          <h3 data-testid="recipe-title">{ drinkId.strMeal }</h3>
          <button
            type="button"
            data-testid="share-btn"
          >
            Compartilhar
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            Favoritar
          </button>
          <span data-testid="recipe-category">{ drinkId.strCategory }</span>
          <ul className="list-ingredients">
            { ingredientsList().map((ingredients, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredients}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{ drinkId.strInstructions }</p>
          <Carousel>
            { mealRecomendation.slice(0, maxRecomendations).map((drink, index) => (
              <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
                <img alt="Recomendation" src={ drink.strDrinkThumb } />
                <Carousel.Caption>
                  <p
                    data-testid={ `${index}-recomendation-title` }
                  >
                    {drink.strDrink}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            )) }
          </Carousel>
          <button
            type="button"
            data-testid="start-recipe-btn"
          >
            Iniciar
          </button>
        </div>
      ) }
    </div>
  );
}

export default DrinkDetails;
