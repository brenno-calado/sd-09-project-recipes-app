import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { fetchRecipeDetails } from '../../services/api';
import { MealsRecomendations } from '../../components';
import IngredientsContainer from '../../components/IngredientsContainer';
import { getItemLocalStorage,
  updateLocalStorage } from '../../services/localStorageService';
import { addToFavorite, removeToFavorite,
  verifyItemInFavorite } from '../../services/functionsApi';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function DrinksDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    const getData = async () => setData(await fetchRecipeDetails(id, false));
    getData();
    setFavoriteRecipe(verifyItemInFavorite(id));
    setDoneRecipe(localStorage.doneRecipes
      && getItemLocalStorage('doneRecipes')
        .some(({ id: idItem }) => idItem === id));
  }, [id]);

  const recipeInProgress = localStorage.inProgressRecipes && Object
    .keys(getItemLocalStorage('inProgressRecipes').cocktails).includes(id);

  const handleClick = () => {
    if (!recipeInProgress) {
      updateLocalStorage('inProgressRecipes', 'cocktails', id, []);
    }
    setShouldRedirect(true);
  };

  const share = () => {
    const { location: { href } } = window;
    navigator.clipboard.writeText(href);
    setCopy(true);
  };

  const favorite = () => {
    if (!favoriteRecipe) {
      addToFavorite('drinks', data);
    } else {
      removeToFavorite(id);
    }
    setFavoriteRecipe(!favoriteRecipe);
  };

  const { strDrinkThumb, strDrink, strInstructions, strAlcoholic } = data;

  if (shouldRedirect) return <Redirect to={ `/bebidas/${id}/in-progress` } />;

  return (
    <section className="recipe-details">
      <img data-testid="recipe-photo" src={ strDrinkThumb } alt="recipe" />
      <h2 data-testid="recipe-title">{strDrink}</h2>
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
      <p data-testid="recipe-category">{ strAlcoholic }</p>

      <IngredientsContainer data={ data } />
      <p data-testid="instructions">{strInstructions}</p>
      { !doneRecipe && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="btn-initial"
          onClick={ handleClick }
        >
          { recipeInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
        </button>) }
      <MealsRecomendations />
      { copy && <p>Link copiado!</p> }
    </section>
  );
}

export default DrinksDetails;
