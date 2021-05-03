import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import { getFoodIdDetails, getDrinks } from '../services';
import { AppContext } from '../context/AppContext';
import shareImg from '../images/shareIcon.svg';
import whiteHeartImg from '../images/whiteHeartIcon.svg';
import blackHeartImg from '../images/blackHeartIcon.svg';

const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};

const checkFavorite = (recipeId) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (favorites.find((recipe) => recipe.id === recipeId)) return true;
  return false;
};

const checkDoneRecipes = (recipeId) => {
  if (doneRecipes.find((recipe) => recipe.id === recipeId)) {
    return true;
  }
  return false;
};

const replaceVideoUrl = (idDetails) => {
  const { strYoutube } = idDetails;
  if (strYoutube) {
    const urlArray = strYoutube.split('=');
    return `https://www.youtube.com/embed/${urlArray[1]}`;
  }
};

const handleButtonName = (id) => {
  if (inProgressRecipes) {
    if (inProgressRecipes.meals) {
      return inProgressRecipes.meals[id] ? 'Continuar Receita' : 'Iniciar Receita';
    }
    return 'Iniciar Receita';
  }
};

const DetalhesComida = () => {
  const {
    favoriteRecipe,
    removeFromFavorite,
  } = useContext(AppContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [idDetails, setIdDetails] = useState([]);
  const [linkShared, setLinkShared] = useState(false);
  const [recomendations, setRecomendations] = useState([]);

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
    copy(`http://localhost:3000${pathname}`);
    setLinkShared(true);
  };

  const handleFavorite = () => {
    const { idMeal, strMeal, strArea, strCategory, strMealThumb } = idDetails;
    if (!checkFavorite(idMeal)) {
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
      <button type="button" onClick={ () => handleShare() }>
        <img data-testid="share-btn" src={ shareImg } alt="Compartilhar" />
      </button>
      { linkShared && <p>Link copiado!</p> }
      <button type="button" onClick={ handleFavorite }>
        <img
          data-testid="favorite-btn"
          src={ checkFavorite(idMeal) ? blackHeartImg : whiteHeartImg }
          alt="Favoritas"
        />
      </button>
      <p data-testid="recipe-category">{strCategory}</p>
      { idDetails && getIngredients().map((ingredient, index) => (
        <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
          {`${ingredient.name} ${ingredient.measure === null ? '' : ingredient.measure}`}
        </p>
      )) }
      <p data-testid="instructions">{strInstructions}</p>
      <iframe
        data-testid="video"
        title="Instructions"
        src={ replaceVideoUrl((idDetails)) }
      />
      <p>Bebidas recomendadas</p>
      { recomendations && recomendations.map((drink, index) => (
        <div data-testid={ `${index}-recomendation-card` } key={ drink.idDrink }>
          <img
            data-testid={ `${index}-recomendation-img` }
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            width="100px"
          />
          <p data-testid={ `${index}-recomendation-title` }>{drink.strDrink}</p>
        </div>
      )) }
      { !checkDoneRecipes(idMeal) && (
        <Link to={ `${id}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
          >
            { handleButtonName(idMeal) }
          </button>
        </Link>
      ) }
    </div>
  );
};

export default DetalhesComida;
