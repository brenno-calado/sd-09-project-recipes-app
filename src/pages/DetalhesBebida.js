import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import copy from 'clipboard-copy';
import HomeButton from '../components/HomeButton';
import { getDrinkIdDetails, getFoods } from '../services';
import { AppContext } from '../context/AppContext';
import shareImg from '../images/shareIcon.svg';
import whiteHeartImg from '../images/whiteHeartIcon.svg';
import blackHeartImg from '../images/blackHeartIcon.svg';
import next from '../images/next.svg';
import previous from '../images/previous.svg';
import '../CSS/DetalhesProgresso.css';

const checkDoneRecipes = (doneRecipes, recipeId) => {
  if (doneRecipes.find((recipe) => recipe.id === recipeId)) {
    return true;
  }
  return false;
};

const handleButtonName = (inProgressRecipes, id) => {
  if (inProgressRecipes) {
    if (inProgressRecipes.cocktails) {
      return inProgressRecipes.cocktails[id] ? 'Continuar Receita' : 'Iniciar Receita';
    }
    return 'Iniciar Receita';
  }
};

const getIngredients = (idDetails) => {
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

const DetalhesBebida = () => {
  const {
    favoriteRecipe,
    removeFromFavorite,
    doneRecipes,
    inProgressRecipes,
    favoriteRecipes,
  } = useContext(AppContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [idDetails, setIdDetails] = useState([]);
  const [linkShared, setLinkShared] = useState(false);
  const [recomendations, setRecomendations] = useState([]);

  const fetchDetails = async (identification) => {
    const results = await getDrinkIdDetails(identification);
    setIdDetails(results);
  };

  const fetchRecomendations = async () => {
    const MAX_RECOMENDATION = 6;
    const results = await getFoods();
    setRecomendations(results.slice(0, MAX_RECOMENDATION));
  };

  const checkFavorite = (recipeId) => {
    if (favoriteRecipes.find((recipe) => recipe.id === recipeId)) return true;
    return false;
  };

  const handleFavorite = () => {
    const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb } = idDetails;
    if (!checkFavorite(idDrink)) {
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
      removeFromFavorite(idDrink);
    }
  };

  const handleShare = () => {
    copy(`http://localhost:3000${pathname}`);
    setLinkShared(true);
  };

  useEffect(() => {
    fetchDetails(id);
    fetchRecomendations();
  }, [id]);

  if (!idDetails || !recomendations) return <p>Carregando...</p>;
  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions, idDrink } = idDetails;

  return (
    <div className="recipe-details">
      <div className="img-card">
        <img
          className="recipe-img"
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid="recipe-photo"
        />
      </div>
      <div className="card-content">
        <h2 data-testid="recipe-title">{strDrink}</h2>
        <div className="header-div">
          <button type="button" onClick={ () => handleShare() }>
            <img data-testid="share-btn" src={ shareImg } alt="Compartilhar" />
          </button>
          <button type="button" onClick={ () => (handleFavorite()) }>
            <img
              data-testid="favorite-btn"
              src={ checkFavorite(idDrink) ? blackHeartImg : whiteHeartImg }
              alt="Favoritar"
            />
          </button>
          <HomeButton destination="bebidas" />
        </div>
        { linkShared && <p>Link copiado!</p> }
        <h4 data-testid="recipe-category">{strAlcoholic}</h4>
        <h4>Ingredientes</h4>
        <ul>
          { idDetails && getIngredients(idDetails).map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ ingredient.name }
            >
              {`${ingredient.name} ${ingredient.measure === null
                ? '' : ingredient.measure}`}
            </li>
          )) }
        </ul>
        <p data-testid="instructions">{strInstructions}</p>
        <h4 className="itens-recomendados">Comidas Recomendadas</h4>
        <Carousel
          slide={ false }
          className="carousel"
          prevIcon={ <img src={ previous } alt="Previous Icon" /> }
          nextIcon={ <img src={ next } alt="Next Icon" /> }
        >
          { recomendations && recomendations.map((food, index) => (
            <Carousel.Item key={ food.idMeal }>
              <div data-testid={ `${index}-recomendation-card` }>
                <img
                  data-testid={ `${index}-recomendation-img` }
                  src={ food.strMealThumb }
                  alt={ food.strMeal }
                  width="200px"
                />
                <Carousel.Caption>
                  <p data-testid={ `${index}-recomendation-title` }>{food.strMeal}</p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          )) }
        </Carousel>
      </div>
      { !checkDoneRecipes(doneRecipes, idDrink) && (
        <Link to={ `${id}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
          >
            { handleButtonName(inProgressRecipes, idDrink) }
          </button>
        </Link>
      ) }
    </div>
  );
};

export default DetalhesBebida;
