import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { fetchRecipeDetails } from '../../services/api';
import { DrinksRecomendations, YoutubePlayer } from '../../components';
import { getItemLocalStorage,
  updateLocalStorage } from '../../services/localStorageService';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';

function MealsDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    const getData = async () => setData(await fetchRecipeDetails(id, true));
    getData();
  }, [id]);

  const handleClick = () => {
    console.log('Cliquei');
    updateLocalStorage('inProgressRecipes', 'meals', id, []);
    setShouldRedirect(true);
  };

  const share = () => {
    const { location: { href } } = window;
    console.log(href);
    navigator.clipboard.writeText(href);
    setCopy(true);
  };

  const recipeInProgress = localStorage.inProgressRecipes && Object
    .keys(getItemLocalStorage('inProgressRecipes').meals).includes(id);

  const ingredients = Object.keys(data).filter((el) => el.includes('strIngredient'));
  const measures = Object.keys(data).filter((el) => el.includes('strMeasure'));
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = data;

  if (shouldRedirect) return <Redirect to={ `/comidas/${id}/in-progress` } />;

  return (
    <section className="recipe-details">
      <img data-testid="recipe-photo" src={ strMealThumb } alt="recipe" />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <button data-testid="share-btn" type="button" onClick={ share }>
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favorite icon" />
      </button>
      <p data-testid="recipe-category">{ strCategory }</p>
      { ingredients.map((ingredient, index) => (
        data[ingredient] && data[ingredient].length ? (
          <p data-testid={ `${index}-ingredient-name-and-measure` } key={ ingredient }>
            { data[ingredient] && `${data[ingredient]} ${data[measures[index]]}` }
          </p>
        ) : false
      )) }
      <p data-testid="instructions">{strInstructions}</p>
      <YoutubePlayer url={ strYoutube } title={ strMeal } />
      <DrinksRecomendations />
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="btn-initial"
        onClick={ handleClick }
      >
        { recipeInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>
      { copy && <span>Link copiado!</span> }
    </section>
  );
}

export default MealsDetails;
