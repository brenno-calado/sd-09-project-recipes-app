import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import { getDrinkIdDetails, getFoods } from '../services';
import { AppContext } from '../context/AppContext';
import shareImg from '../images/shareIcon.svg';
import whiteHeartImg from '../images/whiteHeartIcon.svg';
import blackHeartImg from '../images/blackHeartIcon.svg';

const DetalhesBebida = () => {
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

  const getIngredients = () => {
    const ingredients = Object.entries(idDetails).filter(
      (details) => {
        const condition1 = details[0].includes('Ingredient');
        const condition2 = details[1] !== '' && details[1] !== null;
        return condition1 && condition2;
      },
    );
    const measure = Object.entries(idDetails).filter(
      (details) => details[0].includes('Measure'),
    );
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
    const results = await getDrinkIdDetails(identification);
    setIdDetails(results);
  };

  const fetchRecomendations = async () => {
    const MAX_RECOMENDATION = 6;
    const results = await getFoods();
    setRecomendations(results.splice(0, MAX_RECOMENDATION));
  };

  const handleShare = () => {
    copy(`http://localhost:3000/${pathname}`);
    setLinkShared(true);
  };

  const handleFavorite = () => {
    const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb } = idDetails;
    if (!favorites[idDrink]) {
      addToFavorites(idDrink);
      favoriteRecipe({
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      });
    } else {
      removeFromTheFavorites(idDrink);
      removeFromFavorite(idDrink);
    }
  };

  useEffect(() => {
    fetchDetails(id);
    fetchRecomendations();
  }, [id]);

  if (!idDetails || !recomendations) return <p>Carregando...</p>;
  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions, idDrink } = idDetails;

  return (
    <div>
      <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <button type="button" data-testid="share-btn" onClick={ handleShare }>
        <img src={ shareImg } alt="Compartilhar" />
      </button>
      { linkShared && <p>Link copiado!</p> }
      <button type="button" data-testid="favorite-btn" onClick={ handleFavorite }>
        <img src={ favorites[idDrink] ? blackHeartImg : whiteHeartImg } alt="Favoritar" />
      </button>
      <p data-testid="recipe-category">{strAlcoholic}</p>
      { idDetails && getIngredients().map((ingredient, index) => (
        <p data-testid={ `${index}-ingredient-name-and-measure` } key={ ingredient.name }>
          {`${ingredient.name} ${ingredient.measure === null ? '' : ingredient.measure}`}
        </p>
      )) }
      <p data-testid="instructions">{strInstructions}</p>
      <p>Comidas Recomendadas</p>
      { recomendations.map((food, index) => (
        <div data-testid={ `${index}-recomendation-card` } key={ food.idMeal }>
          <img
            data-testid={ `${index}-card-img` }
            src={ food.strMealThumb }
            alt={ food.strMeal }
            width="100px"
          />
          <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
        </div>
      )) }
      <Link to={ { pathname: `${id}/in-progress`, ingredientsList: getIngredients() } }>
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

export default DetalhesBebida;
