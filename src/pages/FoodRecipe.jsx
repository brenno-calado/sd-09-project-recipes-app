import React, { useState, useEffect } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchDetails from '../service/mealApi';

function FoodRecipe() {
  const [copy, setCopy] = useState(false);
  const [food, setFood] = useState([]);

  useEffect(() => {
    const fetchFood = async () => {
      const foodArray = await fetchDetails(52772);
      setFood(foodArray.meals[0]);
    };
    fetchFood();
  }, []);

  const listIngredients = () => {
    const list = [];
    if (food.length !== 0) {
      for (let index = 1; food[`strIngredient${index}`] !== ''; index += 1) {
        list.push(`
          ${food[`strIngredient${index}`]} - ${food[`strMeasure${index}`]}
        `);
      }
      return list;
    } return null;
  };

  function msgShare({ target: { id } }) {
    if (id === 'share') {
      setCopy(true);
      return <span>link copiado</span>;
    } return null;
  }

  return (
    <div>
      { food.length !== 0 ? (
        <>
          <img
            width="400"
            height="400"
            alt="recipe"
            data-testid="recipe-photo"
            src={ food.strMealThumb }
          />
          <h3
            data-testid="recipe-title"
          >
            {food.strMeal}
          </h3>
          <button
            id="share"
            type="button"
            data-testid="favorite-btn"
          >
            {copy ? msgShare() : (<img src={ shareIcon } alt="Share" />) }
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            <img src={ whiteHeartIcon } alt="Favorit" />
          </button>
          <span data-testid="recipe-category">{food.strCategory}</span>
          <ul>
            {listIngredients().map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient}
              </li>
            ))}
          </ul>
          <h3>Video</h3>
          <video
            width="400"
            height="400"
            src={ food.strYoutube }
            controls
          >
            <track kind="captions" />
          </video>
          <button
            type="button"
            data-testid="start-recipe-btn"
          >
            Iniciar Receita
          </button>
        </>
      ) : null }
    </div>
  );
}

export default FoodRecipe;
