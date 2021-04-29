import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import { getFoodIdDetails, getDrinks } from '../services';
import { AppContext } from '../context/AppContext';
import shareImg from '../images/shareIcon.svg';
import whiteHeartImg from '../images/whiteHeartIcon.svg';
import blackHeartImg from '../images/blackHeartIcon.svg';

const DetalhesComida = () => {
  const {
    favoriteRecipe,
    removeFromFavorite,
    addToFavorites,
    removeFromTheFavorites,
    favorites,
  } = useContext(AppContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [idDetails, setIdDetails] = useState([]);
  const [linkShared, setLinkShared] = useState(false);
  const [recomendations, setRecomendations] = useState([]);

  const replaceVideoUrl = () => {
    const { strYoutube } = idDetails;
    if (strYoutube) {
      const urlArray = strYoutube.split('=');
      return `https://www.youtube.com/embed/${urlArray[1]}`;
    }
  };

  const getIngredients = () => {
    const ingredients = Object.entries(idDetails).filter((details) => {
      const condition1 = details[0].includes('Ingredient');
      const condition2 = details[1] !== '' && details[1] !== null;
      return condition1 && condition2;
    });
    const measure = Object.entries(idDetails)
      .filter((details) => details[0].includes('Measure'));
    const ingredientsArray = ingredients.reduce((acc, curr, index) => {
      acc.push({ name: curr[1], index });
      return acc;
    }, []);
    const measuresArray = measure.reduce((acc, curr, index) => {
      acc.push({ measure: curr[1], index });
      return acc;
    }, []);
    return ingredientsArray.map((ingredient) => {
      const measurament = measuresArray
        .filter((quantity) => ingredient.index === quantity.index);
      return { name: ingredient.name, measure: measurament[0].measure };
    });
  };

  const fetchDetails = async (identification) => {
    const results = await getFoodIdDetails(identification);
    setIdDetails(results);
  };

  const fetchRecomendations = async () => {
    const MAX_RECOMENDATION = 6;
    const results = await getDrinks();
    setRecomendations(results.splice(0, MAX_RECOMENDATION));
  };

  const handleShare = () => {
    copy(pathname);
    setLinkShared(true);
  };

  const handleFavorite = () => {
    const { idMeal, strMeal, strArea, strCategory, strMealThumb } = idDetails;
    if (!favorites[idMeal]) {
      addToFavorites(idMeal);
      favoriteRecipe({
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      });
    } else {
      removeFromTheFavorites(idMeal);
      removeFromFavorite(idMeal);
    }
  };

  useEffect(() => {
    fetchDetails(id);
    fetchRecomendations();
  }, [id]);

  if (!idDetails || !recomendations) return <p>Carregando...</p>;
  const { strMealThumb, strMeal, strCategory, strInstructions, idMeal } = idDetails;

  return (
    <div>
      <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <button type="button" data-testid="share-btn" onClick={ handleShare }>
        <img src={ shareImg } alt="Compartilhar" />
      </button>
      { linkShared && <p>Link copiado!</p> }
      <button type="button" data-testid="favorite-btn" onClick={ handleFavorite }>
        <img src={ favorites[idMeal] ? blackHeartImg : whiteHeartImg } alt="Favoritas" />
      </button>
      <p data-testid="recipe-category">{strCategory}</p>
      { idDetails && getIngredients().map((ingredient, index) => (
        <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
          {`${ingredient.name} ${ingredient.measure === null ? '' : ingredient.measure}`}
        </p>
      )) }
      <p data-testid="instructions">{strInstructions}</p>
      <iframe data-testid="video" title="Instructions" src={ replaceVideoUrl() } />
      <p>Bebidas recomendadas</p>
      { recomendations && recomendations.map((drink, index) => (
        <div data-testid={ `${index}-recomendation-card` } key={ drink.idDrink }>
          <img
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            width="100px"
          />
          <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
        </div>
      )) }
      <Link to={ `${id}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
        >
          Iniciar Receita
        </button>
      </Link>
    </div>
  );
};

export default DetalhesComida;
