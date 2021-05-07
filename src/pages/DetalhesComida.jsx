import React, { useEffect, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import MealContext from '../context/MealContext';
import shareImg from '../images/shareIcon.svg';
import noFav from '../images/blackHeartIcon.svg';

function DetalhesComida() {
  const { recipeDt, setRecipeDt } = useContext(MealContext);
  const idReceita = useRouteMatch('/comidas/:id');
  const { id } = idReceita.params;
  console.log('id da receita:', id);

  function ingredientHELL(recipe) {
    const keys = Object.entries(recipe);
    const result = [];
    // console.log(keys);
    const filteredIng = keys.filter((key) => key[0].includes('strIngredient'));
    const filteredMeasures = keys.filter((key) => key[0].includes('strMeasure'));
    for (let i = 0; i < filteredIng.length; i += 1) {
      if (filteredIng[i][1] === '' || filteredIng[i][1] === null) {
        filteredIng.splice(i, 1);
        filteredMeasures.splice(i, 1);
        i -= 1;
      }
    }
    // console.log(filteredIng);
    // console.log(filteredMeasures);
    for (let i = 0; i < filteredIng.length; i += 1) {
      result.push(
        `${filteredIng[i][1]} - ${filteredMeasures[i][1]}`,
      );
    }
    console.log(result);
    return (
      result.map((ing, index) => (
        <li
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          { ing }
        </li>))
    );
  }

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const responseJson = await response.json();
        const recipe = await responseJson.meals[0];
        console.log(recipe);
        setRecipeDt(recipe);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRecipe();
  }, [setRecipeDt, id]);

  console.log('The recipe:', recipeDt);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeDt.strMealThumb }
        alt="imagem da comida"
      />
      <h1 data-testid="recipe-title">{ recipeDt.strMeal }</h1>
      <button data-testid="share-btn" type="button">
        <img src={ shareImg } alt="Share" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ noFav } alt="Favorite" />
      </button>
      <h3 data-testid="recipe-category">{ recipeDt.strCategory }</h3>
      <h2>Ingredientes:</h2>
      <ul>
        { ingredientHELL(recipeDt) }
      </ul>
      <p data-testid="instructions">
        { recipeDt.strInstructions }
      </p>

      <iframe
        data-testid="video"
        width="425"
        height="240"
        src={ recipeDt.strYoutube }
        title="Video"
      />

      {/* Receitas Recomendadas devera ser um componente separado. */}

      <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
    </div>
  );
}

export default DetalhesComida;
