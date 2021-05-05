import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlackHartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';

function DrinkDetails({ match }) {
  const [drinkDetails, setDrinkDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mealRecomendation, setMealRecomendation] = useState(null);
  const [startedRecipe, setStartRecipe] = useState(true);
  const { id } = match.params;

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

  useEffect(() => {
    fetchDetail();
    fetchRecomendation();
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
            >
              <img src={ ShareIcon } alt="share" />
            </button>
            <button
              className="main-buttons"
              type="button"
              data-testid="favorite-btn"
            >
              <img src={ BlackHartIcon } alt="favorite" />
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
    setStartRecipe(false);
  };

  const startButton = () => (
    <Link to={ `/bebidas/${id}/in-progress` }>
      <button
        className="start-recipe basic-btn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ startRecipe }
      >
        Iniciar Receita
      </button>
    </Link>
  );

  return (
    <div>
      { !loading && drinkDetails === null && <p>Não foi possível renderizar</p>}
      {loading && <p>Carregando...</p>}
      {renderDrink()}
      {mealRecomendation === null ? <p>sem recomendações</p> : renderRecomendation()}
      {!startedRecipe ? <p>Esta receita esta em progresso</p> : startButton()}
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default DrinkDetails;
