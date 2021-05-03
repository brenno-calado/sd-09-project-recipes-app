import React, { useState, useEffect } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchDetails from '../service/mealApi';

function DrinkRecipe() {
  const [copy, setCopy] = useState(false);
  const [drink, setDrink] = useState([]);

  useEffect(() => {
    const fetchDrink = async () => {
      const drinkArray = await fetchDetails();
      setDrink(drinkArray.meals[0]);
    };
    fetchDrink();
  }, []);

  const listIngredients = () => {
    const list = [];
    if (drink.length !== 0) {
      for (let index = 1; drink[`strIngredient${index}`] !== ''; index += 1) {
        list.push(`
          ${drink[`strIngredient${index}`]} - ${drink[`strMeasure${index}`]}
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
      { drink.length !== 0 ? (
        <>
          <img
            alt="recipe"
            data-testid="recipe-photo"
            src={ drink.strMealThumb }
          />
          <h3
            data-testid="recipe-title"
          >
            {drink.strMeal}
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
          <span data-testid="recipe-category">{drink.strCategory}</span>
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
            src={ drink.strYoutube }
            controls
          >
            <track kind="captions" />
          </video>
          <br />
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

export default DrinkRecipe;
