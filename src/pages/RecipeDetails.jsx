import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { Carousel } from 'react-b'
import ReactPlayer from 'react-player';
import Header from '../components/Header';
import RecipesAppContext from '../context/RecipesAppContext';

function RecipeDetails() {
  const {
    mealsRecipes,
    isFetching,
    mealId,
    getMealId,
    drinkRecomendation,
  } = useContext(RecipesAppContext);

  const location = useLocation();
  const id = location.pathname.split('comidas/', 2)[1];

  // const responsive = {
  //   drinkRecomendation: {
  //     items: 2,
  //   },
  // };

  useEffect(() => {
    getMealId(id);
  }, [getMealId, id]);

  const ingredientsList = () => {
    const list = [];

    for (let index = 1; mealId[`strIngredient${index}`] !== ''; index += 1) {
      list.push(`
        ${mealId[`strIngredient${index}`]} - ${mealId[`strMeasure${index}`]}
      `);
    }
    return list;
  };

  return (
    <div>
      <Header />
      { (!(isFetching) && (mealsRecipes !== null)) && (
        <div>
          <img
            data-testid="recipe-photo"
            alt={ mealId.strMeal }
            src={ mealId.strMealThumb }
          />
          <h3 data-testid="recipe-title">{ mealId.strMeal }</h3>
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
          <span data-testid="recipe-category">{ mealId.strCategory }</span>
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
          <p data-testid="instructions">{ mealId.strInstructions }</p>
          <ReactPlayer
            url={ mealId.strYoutube }
            data-testid="video"
          />
          {/* <Carousel>
            { drinkRecomendation.slice(0, 6).map((drink, index) => (
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
          </Carousel> */}
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

export default RecipeDetails;
