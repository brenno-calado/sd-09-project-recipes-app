import React, { useEffect, useState, useContext } from 'react';
import { useParams, Redirect, useLocation, Link } from 'react-router-dom';
import { Context } from '../context';
import { fetchRecipeDetails } from '../services/api';
import { MealsRecomendations, YoutubePlayer, FavoriteButton,
  IngredientsContainer, DrinksRecomendations } from '../components';
import { verifyItemInFavorite } from '../services/functionsApi';
import { getItemLocalStorage, updateLocalStorage } from '../services/localStorageService';
import shareIcon from '../images/shareIcon.svg';
import arrowLeft from '../images/arrowLeftIcon.svg';
import '../css/RecipeDetails.css';

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
    <section className="wrapper-recipe-details">
      <div className="top-icons-container">
        <Link to={ `/${pathname.split('/')[1]}` } className="square-icon right-border">
          <img src={ arrowLeft } alt="go Back" className="arrow" />
        </Link>
        <div className="square-icon left-border">
          <button data-testid="share-btn" type="button" onClick={ share }>
            <img src={ shareIcon } alt="share icon" />
          </button>
        </div>
      </div>
      <div className="thumb-container">
        <div className="gradient-thumb" />
        <img
          data-testid="recipe-photo"
          src={ data[`str${querys[1]}Thumb`] }
          alt="recipe"
          className="thumb-recipe"
        />
      </div>
      <div className="title-container">
        <div className="text">
          <h2 data-testid="recipe-title" className="title">{data[`str${querys[1]}`]}</h2>
          <p data-testid="recipe-category">
            { `Category: ${isMealPage ? data.strCategory : data.strAlcoholic}` }
          </p>
        </div>
        <FavoriteButton data={ data } id={ id } query={ querys[1] } />
      </div>

      <IngredientsContainer data={ data } />

      { isMealPage && <YoutubePlayer url={ data.strYoutube } title={ data.strMeal } /> }

      <p data-testid="instructions">{data.strInstructions}</p>
      { !doneRecipe && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="start-recipe-btn"
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
