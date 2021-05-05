import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlackHartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';

function FoodDetails({ match }) {
  const [mealDetails, setMealDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drinkRecomendation, setDrinkRecomendation] = useState(null);
  const [startedRecipe, setStartRecipe] = useState(true);
  const { id } = match.params;

  const fetchDetail = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const mealDetailsApi = await response.json();
      setMealDetails(mealDetailsApi.meals[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecomendation = async () => {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const drinkRecomendationApi = await response.json();
      setDrinkRecomendation(drinkRecomendationApi.drinks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDetail();
    fetchRecomendation();
  }, []);

  const searchIngredients = (key) => (
    Object.keys(mealDetails)
      .filter((keys) => keys.includes(key))
      .map((ingredients) => mealDetails[ingredients])
  );

  const mealIngredients = () => {
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
              {`${ingredient} - ${measures[index]}`}
            </p>
          )
        ))}
      </div>
    );
  };

  const renderMeal = () => {
    if (mealDetails) {
      return (
        <div className="">
          <header>
            <img
              src={ mealDetails.strMealThumb }
              alt={ mealDetails.strMeal }
              data-testid="recipe-photo"
              className="recipe-photo"
            />
            <h3 data-testid="recipe-title">{mealDetails.strMeal}</h3>
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
            <p data-testid="recipe-category">{mealDetails.strCategory}</p>
          </header>
          <main>
            <h4>Ingredientes</h4>
            {mealIngredients()}
            <h4>Instruções</h4>
            <p data-testid="instructions">{ mealDetails.strInstructions }</p>
            <h4>Video</h4>
            <iframe
              data-testid="video"
              width="300"
              src={ `https://www.youtube.com/embed/${mealDetails.strYoutube.split('=')[1]}` }
              title={ mealDetails.strMeal }
              frameBorder="0"
              allow="accelerometer;
                autoplay; clipboard-write;
                encrypted-media;
                gyroscope; picture-in-picture"
              allowFullScreen
            />
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
          {drinkRecomendation.slice(0, numberSix).map((drink, index) => (
            <Carousel.Item
              data-testid={ `${index}-recomendation-card` }
              key={ drink.idDrink }
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                className="carousel-img"
              />
              <h5
                data-testid={ `${index}-recomendation-title` }
              >
                {drink.strDrink}
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
    <Link to={ `/comidas/${id}/in-progress` }>
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
      { !loading && mealDetails === null && <p>Não foi possível renderizar</p>}
      {loading && <p>Carregando...</p>}
      {renderMeal()}
      {drinkRecomendation === null ? <p>sem recomendações</p> : renderRecomendation()}
      {!startedRecipe ? <p>Esta receita esta em progresso</p> : startButton()}
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default FoodDetails;
