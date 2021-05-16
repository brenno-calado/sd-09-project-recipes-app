import React, { useEffect, useState, useContext } from 'react';
import { useParams, Redirect, useLocation } from 'react-router-dom';
import { Context } from '../context';
import { fetchRecipeDetails } from '../services/api';
import { MealsRecomendations, YoutubePlayer, FavoriteButton,
  IngredientsContainer, DrinksRecomendations } from '../components';
import { verifyItemInFavorite } from '../services/functionsApi';
import { getItemLocalStorage, updateLocalStorage } from '../services/localStorageService';
import shareIcon from '../images/shareIcon.svg';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { setFavoriteRecipe } = useContext(Context);
  const [data, setData] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [copy, setCopy] = useState(false);

  const isMealPage = pathname.includes('comidas');
  const querys = isMealPage ? ['meals', 'Meal'] : ['cocktails', 'Drink'];

  useEffect(() => {
    const getData = async () => setData(await fetchRecipeDetails(id, isMealPage));
    getData();
    setFavoriteRecipe(verifyItemInFavorite(id));
    setDoneRecipe(localStorage.doneRecipes
      && getItemLocalStorage('doneRecipes')
        .some(({ id: idItem }) => idItem === id));
  }, [id, isMealPage, setFavoriteRecipe]);

  const recipeInProgress = localStorage.inProgressRecipes && Object
    .keys(getItemLocalStorage('inProgressRecipes')[querys[0]]).includes(id);

  const handleClick = () => {
    if (!recipeInProgress) {
      updateLocalStorage('inProgressRecipes', querys[0], id, []);
    }
    setShouldRedirect(true);
  };

  const share = () => {
    const { location: { href } } = window;
    navigator.clipboard.writeText(href);
    setCopy(true);
  };

  if (shouldRedirect) {
    return <Redirect to={ `/${pathname.split('/')[1]}/${id}/in-progress` } />;
  }

  return (
    <section className="recipe-details">
      <img data-testid="recipe-photo" src={ data[`str${querys[1]}Thumb`] } alt="recipe" />
      <h2 data-testid="recipe-title">{data[`str${querys[1]}`]}</h2>
      <button data-testid="share-btn" type="button" onClick={ share }>
        <img src={ shareIcon } alt="share icon" />
      </button>

      <FavoriteButton data={ data } id={ id } query={ querys[1] } />

      <p data-testid="recipe-category">
        { isMealPage ? data.strCategory : data.strAlcoholic }
      </p>

      <IngredientsContainer data={ data } />

      { isMealPage && <YoutubePlayer url={ data.strYoutube } title={ data.strMeal } /> }

      <p data-testid="instructions">{data.strInstructions}</p>
      { !doneRecipe && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="btn-initial"
          onClick={ handleClick }
        >
          { recipeInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
        </button>) }

      { isMealPage ? <DrinksRecomendations /> : <MealsRecomendations />}
      { copy && <p>Link copiado!</p> }
    </section>
  );
}

export default RecipeDetails;
