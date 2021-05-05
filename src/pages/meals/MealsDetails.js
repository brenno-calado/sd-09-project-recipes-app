import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { fetchRecipeDetails } from '../../services/api';
import { DrinksRecomendations, YoutubePlayer } from '../../components';
import { getItemLocalStorage,
  updateLocalStorage } from '../../services/localStorageService';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import IngredientsContainer from '../../components/IngredientsContainer';

function MealsDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    const getData = async () => setData(await fetchRecipeDetails(id, true));
    getData();
    setFavoriteRecipe(localStorage.favoriteRecipes
      && getItemLocalStorage('favoriteRecipes')
        .some(({ id: idItem }) => idItem === id));
    setDoneRecipe(localStorage.doneRecipes
      && getItemLocalStorage('doneRecipes')
        .some(({ id: idItem }) => idItem === id));
  }, [id]);

  const handleClick = () => {
    updateLocalStorage('inProgressRecipes', 'meals', id, []);
    setShouldRedirect(true);
  };

  const share = () => {
    const { location: { href } } = window;
    navigator.clipboard.writeText(href);
    setCopy(true);
  };

  const favorite = () => {
    if (!favoriteRecipe) {
      const favoriteItem = {
        id,
        type: 'comida',
        area: data.strArea,
        category: data.strCategory,
        alcoholicOrNot: '',
        name: data.strMeal,
        image: data.strMealThumb,
      };
      updateLocalStorage('doneOrFavoriteRecipes', 'favoriteRecipes', favoriteItem);
    } else {
      const newFavoriteArray = localStorage.favoriteRecipes
        && getItemLocalStorage('favoriteRecipes')
          .filter(({ id: idItem }) => idItem !== id);
      updateLocalStorage('updateFavoriteRecipes', null, newFavoriteArray);
    }
    setFavoriteRecipe(!favoriteRecipe);
  };

  const recipeInProgress = localStorage.inProgressRecipes && Object
    .keys(getItemLocalStorage('inProgressRecipes').meals).includes(id);

  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = data;

  if (shouldRedirect) return <Redirect to={ `/comidas/${id}/in-progress` } />;

  return (
    <section className="recipe-details">
      <img data-testid="recipe-photo" src={ strMealThumb } alt="recipe" />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <button data-testid="share-btn" type="button" onClick={ share }>
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ favorite }
        src={ !favoriteRecipe ? whiteHeartIcon : blackHeartIcon }
      >
        <img
          src={ !favoriteRecipe ? whiteHeartIcon : blackHeartIcon }
          alt="favorite icon"
        />
      </button>
      <p data-testid="recipe-category">{ strCategory }</p>

      <IngredientsContainer data={ data } />

      <p data-testid="instructions">{strInstructions}</p>
      <YoutubePlayer url={ strYoutube } title={ strMeal } />
      <DrinksRecomendations />
      { !doneRecipe && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="btn-initial"
          onClick={ handleClick }
        >
          { recipeInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
        </button>) }
      { copy && <span>Link copiado!</span> }
    </section>
  );
}

export default MealsDetails;
