import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Recommendations from '../components/Recommendations';
import { fetchDetailsFood } from '../service/mealAPI';
import { fetchAllDrinks } from '../service/cocktailAPI';
import '../App.css';

function FoodRecipe({ match: { params: { id } } }) {
  const [copy, setCopy] = useState(false);
  const [food, setFood] = useState([]);
  const [recomendedDrink, setRecomendedDrink] = useState([]);

  const maxResult = 6;

  useEffect(() => {
    const fetchFood = async () => {
      const foodArray = await fetchDetailsFood(id);
      setFood(foodArray.meals[0]);
    };
    fetchFood();
  }, [id]);

  useEffect(() => {
    const fetchRecomended = async () => {
      const recomendedArray = await fetchAllDrinks();
      setRecomendedDrink(recomendedArray.drinks);
    };
    fetchRecomended();
  }, []);

  const listIngredients = () => {
    const list = [];
    if (food.length !== 0) {
      for (let index = 1; food[`strIngredient${index}`] !== ''; index += 1) {
        list.push(`
          ${food[`strIngredient${index}`]} - ${food[`strMeasure${index}`]}
        `);
      }
      return list;
    } return null;
  };

  function sliceYoutube() {
    const { strYoutube } = food;
    const equalSignIndex = 32;
    const slicedYoutube = strYoutube.slice(equalSignIndex);
    return slicedYoutube;
  }

  function msgShare({ target: { id: ide } }) {
    if (ide === 'share') {
      setCopy(true);
      return <span>link copiado!</span>;
    } return null;
  }

  return (
    <div>
      { food.length !== 0 ? (
        <>
          <img
            width="100%"
            alt="recipe"
            data-testid="recipe-photo"
            src={ food.strMealThumb }
          />
          <div className="heading">
            <h3
              data-testid="recipe-title"
            >
              {food.strMeal}
            </h3>
            <div>
              <button
                id="share"
                type="button"
                data-testid="share-btn"
              >
                {copy ? msgShare() : (<img src={ shareIcon } alt="Share" />) }
              </button>
              <button
                type="button"
                data-testid="favorite-btn"
              >
                <img src={ whiteHeartIcon } alt="Favorit" />
              </button>
            </div>
          </div>
          <article className="recipe-body">
            <span
              className="category"
              data-testid="recipe-category"
            >
              {food.strCategory}
            </span>
            <h4>Ingredientes</h4>
            <ul className="ingredients-list">
              {listIngredients().map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient}
                </li>
              ))}
            </ul>
            <h4>Instruções</h4>
            <p data-testid="instructions">{food.strInstructions}</p>
            <h3>Video</h3>
            <iframe
              data-testid="video"
              className="center"
              width="100%"
              height="315"
              src={ `http://www.youtube.com/embed/${sliceYoutube()}` }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer;
              autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <h3>Recomendação</h3>
            <Recommendations recommendations={ recomendedDrink.slice(0, maxResult) } />
            <button
              className="start-recipe-btn"
              type="button"
              data-testid="start-recipe-btn"
            >
              Iniciar Receita
            </button>
          </article>
        </>
      ) : null }
    </div>
  );
}

FoodRecipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default FoodRecipe;
