import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMealNameAPI } from '../../services/fetchMealAPI';
import { fetchDrinkById } from '../../services/fetchDrinkAPI';
import RecommendedCard from '../../common/components/RecommendedCard';
import '../../common/styles/detailsStyles.css';

function DrinkDetails(props) {
  const { match: { params: { id } } } = props;
  const [recommended, setRecommended] = useState([]);
  const [hidden, setHidden] = useState({ first: 0, second: 1 });
  const [drink, setDrink] = useState();
  const seis = 6;
  const idDrink = id;

  async function fetchData() {
    await fetchMealNameAPI('').then((response) => setRecommended(response.meals));
    await fetchDrinkById(idDrink).then((response) => setDrink(response.drinks[0]));
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (hidden.second > seis) {
      setHidden({ first: 0, second: 1 });
    }
  }, [hidden.second]);

  const scrollRecommended = () => {
    setHidden((state) => ({
      first: state.first + 2,
      second: state.second + 2,
    }));
  };

  function showDetails() {
    const maxIngredient = 21;
    let ingredients = [];
    for (let index = 1; index < maxIngredient; index += 1) {
      if (drink[`strIngredient${index}`]) {
        ingredients = [...ingredients, (
          <li key={ index } data-testid={ `${index - 1}-ingredient-name-and-measure` }>
            {drink[`strIngredient${index}`]}
            -
            {drink[`strMeasure${index}`]}
          </li>
        )];
      }
    }
    return <ul>{ingredients}</ul>;
  }

  function renderDrink() {
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt="recipeImg"
          width="350px"
        />
        <div>
          <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
          <h5 data-testid="recipe-category">
            Category:
            { drink.strAlcoholic }
          </h5>
          <button data-testid="share-btn" type="button">Share</button>
          <button data-testid="favorite-btn" type="button">♡</button>
        </div>
        <div>
          <h4>Instructions</h4>
          <p data-testid="instructions">{ drink.strInstructions }</p>
        </div>
        <div>
          <h4>Ingredients</h4>
          { showDetails() }
        </div>
        <h4>Recommended Recipes</h4>
        <div>
          <div style={ { display: 'flex', width: '401px' } }>
            { recommended && recommended
              .slice(0, seis)
              .map((meal, index) => (
                <RecommendedCard
                  recipe={ meal }
                  index={ index }
                  key={ index }
                  hidden={ hidden }
                />
              ))}
          </div>
          <button
            type="button"
            onClick={ scrollRecommended }
          >
            {'-->'}
          </button>
        </div>
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          type="button"
        >
          Start Recipe
        </button>
      </div>
    );
  }

  return (
    (drink ? renderDrink() : <p>Loading...</p>)
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  recipe: PropTypes.shape({
    filter: PropTypes.func,
    includes: PropTypes.func,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strAlcoholic: PropTypes.string,
    srtInstructions: PropTypes.string,
    srtSource: PropTypes.string,
    srtMeasure: PropTypes.string,
  }).isRequired,
};

export default DrinkDetails;
