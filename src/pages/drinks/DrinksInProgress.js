import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { fetchRecipeDetails } from '../../services/api';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';

function DrinksInProgress() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const getData = async () => setData(await fetchRecipeDetails(id, false));
    getData();
  }, [id]);

  const ingredients = Object.keys(data).filter((el) => el.includes('strIngredient'));
  const measures = Object.keys(data).filter((el) => el.includes('strMeasure'));
  const { strDrinkThumb, strDrink, strInstructions, strAlcoholic } = data;

  if (shouldRedirect) return <Redirect to="/receitas-feitas" />;

  return (
    <section className="recipe-details">
      <img data-testid="recipe-photo" src={ strDrinkThumb } alt="recipe" />
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favorite icon" />
      </button>
      <p data-testid="recipe-category">{ strAlcoholic }</p>
      { ingredients.map((ingredient, index) => (
        <label
          htmlFor={ ingredient }
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ ingredient }
        >
          { data[ingredient] && `${data[ingredient]} ${data[measures[index]]}` }
          <input
            data-testid={ `${index}-ingredient-step` }
            id={ ingredient }
            value={ ingredient }
            type="checkbox"
          />
        </label>)) }
      <p data-testid="instructions">{strInstructions}</p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        className="btn-initial"
        onClick={ () => setShouldRedirect(true) }
      >
        Finalizar Receita
      </button>
    </section>
  );
}

export default DrinksInProgress;
