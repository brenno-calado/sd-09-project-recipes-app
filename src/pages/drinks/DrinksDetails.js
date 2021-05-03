import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { fetchRecipeDetails } from '../../services/api';
import { MealsRecomendations } from '../../components';
import { getItemLocalStorage,
  updateLocalStorage } from '../../services/localStorageService';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';

function DrinksDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const getData = async () => setData(await fetchRecipeDetails(id, false));
    getData();
  }, [id]);

  const recipeInProgress = localStorage.inProgressRecipes && Object
    .keys(getItemLocalStorage('inProgressRecipes').cocktails).includes(id);

  const handleClick = () => {
    if (!recipeInProgress) {
      updateLocalStorage('inProgressRecipes', 'cocktails', id, []);
    }
    setShouldRedirect(true);
  };

  const ingredients = Object.keys(data).filter((el) => el.includes('strIngredient'));
  const measures = Object.keys(data).filter((el) => el.includes('strMeasure'));
  const { strDrinkThumb, strDrink, strInstructions, strAlcoholic } = data;

  if (shouldRedirect) return <Redirect to={ `/bebidas/${id}/in-progress` } />;

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
        data[ingredient] && data[ingredient].length ? (
          <p data-testid={ `${index}-ingredient-name-and-measure` } key={ ingredient }>
            { `${data[ingredient]} ${data[measures[index]]}` }
          </p>
        ) : false
      )) }
      <p data-testid="instructions">{strInstructions}</p>
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="btn-initial"
        onClick={ handleClick }
      >
        { recipeInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>
      <MealsRecomendations />
    </section>
  );
}

export default DrinksDetails;
