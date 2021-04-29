import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DetailsDrink({ recipe }) {
  const { strDrink, strDrinkThumb, strAlcoholic, strInstructions } = recipe;

  const getIngredients = () => {
    const maxNumber = 15;
    const ingredients = [];
    for (let index = 1; index <= maxNumber; index += 1) {
      const ingredient = `strIngredient${index}`;
      const quantity = `strMeasure${index}`;
      if (recipe[ingredient] !== null && recipe[ingredient] !== '') {
        ingredients.push({
          name: recipe[ingredient],
          quantity: recipe[quantity],
        });
      }
    }
    return ingredients.map(({ name, quantity }, index) => (
      <li
        key={ name }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {`${name} - ${quantity}`}
      </li>));
  };

  return (
    <div>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid="recipe-photo"
      />
      <div>
        <div>
          <h1 data-testid="recipe-title">{strDrink}</h1>
          <h3 data-testid="recipe-category">{strAlcoholic}</h3>
        </div>
        <div>
          <button type="button" data-testid="share-btn">
            <img src={ shareIcon } alt="Share button" />
          </button>
          <button type="button" data-testid="favorite-btn">
            <img src={ blackHeartIcon } alt="Favorite button" />
          </button>
        </div>
        <div>
          <h2>Ingredients</h2>
          <ul>
            { getIngredients() }
          </ul>
        </div>
        <div>
          <h2>Instructions</h2>
          <p data-testid="instructions">{strInstructions}</p>
        </div>
        <div>
          <h2>Recomended</h2>
          <div data-testid={ `${0}-recomendation-card` }>comidas</div>
        </div>
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </div>
    </div>
  );
}

export default DetailsDrink;
