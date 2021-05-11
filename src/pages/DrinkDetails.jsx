import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import BlackHartIcon from '../images/blackHeartIcon.svg';
import WhiteHartIcon from '../images/whiteHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import StartButton from '../components/StartButton';

const copy = require('clipboard-copy');

function DrinkDetails({ match }) {
  const [drinkDetails, setDrinkDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mealRecomendation, setMealRecomendation] = useState(null);
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const { id } = match.params;
  const cocktails = [];
  const meals = [];
  const inProgress = { cocktails, meals };
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));

  const fetchDetail = async () => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const drinkDetailsApi = await response.json();
      setDrinkDetails(drinkDetailsApi.drinks[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecomendation = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const mealRecomendationApi = await response.json();
      setMealRecomendation(mealRecomendationApi.meals);
    } catch (error) {
      console.error(error);
    }
  };

  const checkFavorite = () => {
    const storageItem = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const favoriteFound = storageItem.some((item) => item.id === id);
    if (favoriteFound) setFavorite(true);
  };

  useEffect(() => {
    fetchDetail();
    fetchRecomendation();
    checkFavorite();
  }, []);

  const searchIngredients = (key) => (
    Object.keys(drinkDetails)
      .filter((keys) => keys.includes(key))
      .map((ingredients) => drinkDetails[ingredients])
  );

  const drinkIngredients = () => {
    const ingredients = searchIngredients('strIngredient');
    const measures = searchIngredients('strMeasure');
    return (
      <div>
        {ingredients.map((ingredient, index) => (
          ingredient !== '' && ingredient !== null && (
            <p
              key={ ingredient }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient} - ${measures[index] !== null ? measures[index]
                : 'To taste'}`}
            </p>
          )
        ))}
      </div>
    );
  };

  const favorited = () => {
    const type = 'bebida';
    const area = '';
    const category = drinkDetails.strCategory;
    const alcoholicOrNot = drinkDetails.strAlcoholic;
    const name = drinkDetails.strDrink;
    const image = drinkDetails.strDrinkThumb;
    const storageItem = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const favoriteRecipes = [
      ...storageItem, { id, type, area, category, alcoholicOrNot, name, image }];
    const favoriteFound = storageItem.some((item) => item.id === id);
    const unfavorite = storageItem.filter((item) => item.id !== id);
    if (favoriteFound) {
      setFavorite(false);
      localStorage.setItem('favoriteRecipes', JSON.stringify(unfavorite));
    }
    if (!favoriteFound) {
      setFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
  };

  const shareBtn = () => {
    copy(`http://localhost:3000/bebidas/${id}`);
    setCopied(true);
  };

  const renderDrink = () => {
    if (drinkDetails) {
      return (
        <div className="">
          <header>
            <img
              src={ drinkDetails.strDrinkThumb }
              alt={ drinkDetails.strDrink }
              data-testid="recipe-photo"
              className="recipe-photo"
            />
            <h3 data-testid="recipe-title">{drinkDetails.strDrink}</h3>
            <button
              className="main-buttons"
              type="button"
              data-testid="share-btn"
              onClick={ shareBtn }
            >
              { copied ? 'Link copiado!'
                : <img src={ ShareIcon } alt="share" />}
            </button>
            <button
              className="main-buttons"
              type="button"
              data-testid="favorite-btn"
              onClick={ favorited }
              src={ favorite ? BlackHartIcon : WhiteHartIcon }
            >
              <img src={ favorite ? BlackHartIcon : WhiteHartIcon } alt="favorite" />
            </button>
            <p data-testid="recipe-category">
              {`${drinkDetails.strCategory} -
             ${drinkDetails.strAlcoholic}`}
            </p>
          </header>
          <main>
            <h4>Ingredientes</h4>
            {drinkIngredients()}
            <h4>Instruções</h4>
            <p data-testid="instructions">{drinkDetails.strInstructions }</p>
          </main>
        </div>
      );
    }
  };

  const renderRecomendation = () => {
    const numberSix = 6;
    return (
      <div>
        <h4>Recomendadas</h4>
        <Carousel className="carousel-container">
          {mealRecomendation.slice(0, numberSix).map((meal, index) => (
            <Carousel.Item
              data-testid={ `${index}-recomendation-card` }
              key={ meal.idMeal }
            >
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                className="carousel-img"
              />
              <h5
                data-testid={ `${index}-recomendation-title` }
              >
                { meal.strMeal }
              </h5>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  };

  const startRecipe = () => {
    const ingredients = searchIngredients('strIngredient');
    const measures = searchIngredients('strMeasure');
    const list = ingredients.map((item, index) => `${item} - ${measures[index]},`);
    const recipesStorage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const progressRecipes = { ...recipesStorage,
      cocktails: { ...recipesStorage.cocktails, [drinkDetails.idDrink]: list,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipes));
  };

  // const startButton = () => {
  //   const storageProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   const inProgressFound = storageProgress !== null ? Object.keys(storageProgress.drinks)
  //     : [];
  //   const inProgress = inProgressFound.includes(id);
  //   const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  //   const done = doneRecipes !== null ? Object.keys(doneRecipes.drinks).includes(id)
  //     : false;
  //   return (
  //     <Link to={ `/bebidas/${id}/in-progress` }>
  //       <button
  //         className={ done ? 'invisible-btn' : 'start-recipe basic-btn' }
  //         type="button"
  //         data-testid="start-recipe-btn"
  //         onClick={ startRecipe }
  //       >
  //         {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
  //       </button>
  //     </Link>
  //   );
  // };

  return (
    <div>
      { !loading && drinkDetails === null && <p>Não foi possível renderizar</p>}
      {loading && <p>Carregando...</p>}
      {renderDrink()}
      {mealRecomendation !== null && renderRecomendation()}
      <StartButton id={ id } startRecipe={ startRecipe } />
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default DrinkDetails;
