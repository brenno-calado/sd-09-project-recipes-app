import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const RecipeInProgress = (props) => {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState();

  const { id } = useParams();
  const { location: { pathname } } = props;
  let isMeal = false;
  let isDrink = false;

  if (pathname.includes('comidas')) {
    isMeal = true;
  } else if (pathname.includes('bebidas')) {
    isDrink = true;
  }

  useEffect(() => {
    let url = '';
    if (isMeal) {
      url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    if (isDrink) {
      url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    fetch(url).then((response) => {
      response.json().then((data) => {
        if (data.meals) {
          setRecipe(data.meals[0]);
        }
        if (data.drinks) {
          setRecipe(data.drinks[0]);
        }
      });
    });
  }, [id, isDrink, isMeal]);

  useEffect(() => {
    let newIngredients = [];
    if (recipe) {
      Object.keys(recipe).forEach((item) => {
        if (item.includes('strIngredient') && recipe[item]) {
          newIngredients = [
            ...newIngredients,
            recipe[item],
          ];
        }
      });
      setIngredients(newIngredients);
    }
  }, [recipe]);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        style={ { width: '25vw' } }
        src={ isMeal ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt="recipe thumbnail"
      />
      <h2 data-testid="recipe-title">
        { isMeal ? recipe.strMeal : recipe.strDrink }
      </h2>
      <div>
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
      </div>
      <p data-testid="recipe-category">{`Categoria: ${recipe.strCategory}`}</p>
      <div>
        <h4>Ingredientes</h4>
        { ingredients && ingredients.map((ingredient, index) => (
          <label
            htmlFor={ ingredient }
            key={ ingredient }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              name={ ingredient }
              value={ ingredient }
            />
            {ingredient}
          </label>
        ))}
      </div>
      <div>
        <h4>Instruções</h4>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
};

export default RecipeInProgress;
