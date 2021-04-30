import React, { useEffect, useState } from 'react';
import { objectOf } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { fetchBeverages } from '../services/fetchRecipes';
import Card from './Card';

function DetailsFood({ recipe }) {
  const [recommends, setRecommends] = useState([]);
  const [allIngrdients, setAllIngrdients] = useState([]);
  const { strMeal, strMealThumb, strCategory, strInstructions, strYoutube } = recipe;
  const embedId = strYoutube ? strYoutube.split('https://www.youtube.com/watch?v=')[1] : '';

  const getIngredients = () => {
    const ingredients = [];
    const ingreQtt = Object.keys(recipe).filter((item) => item.includes('strIngredient'));
    const measureQtt = Object.keys(recipe).filter((item) => item.includes('strMeasure'));
    ingreQtt.forEach((item, index) => {
      if (recipe[item] !== null && recipe[item] !== '') {
        ingredients.push({ name: recipe[item], quantity: recipe[measureQtt[index]] });
      }
    });
    setAllIngrdients(ingredients);
  };

  useEffect(() => {
    const toSlice = 6;
    fetchBeverages().then((data) => setRecommends(data.slice(0, toSlice)));
    getIngredients();
  }, []);

  return (
    <div className="Details">
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
      />
      <div className="title-btns">
        <div>
          <h1 data-testid="recipe-title">{strMeal}</h1>
          <h3 data-testid="recipe-category">{strCategory}</h3>
        </div>
        <div>
          <button type="button" data-testid="share-btn">
            <img src={ shareIcon } alt="Share button" />
          </button>
          <button type="button" data-testid="favorite-btn">
            <img src={ blackHeartIcon } alt="Favorite button" />
          </button>
        </div>
      </div>
      <div className="ingredients">
        <h2>Ingredients</h2>
        <div>
          {allIngrdients.map(({ name, quantity }, index) => (
            <p
              key={ name }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`- ${name} - ${quantity}`}
            </p>))}
        </div>
      </div>
      <div className="instructions">
        <h2>Instructions</h2>
        <p data-testid="instructions">{strInstructions}</p>
      </div>
      <div className="video">
        <h2>Video</h2>
        <iframe src={ `https://www.youtube.com/embed/${embedId}` } title="video" frameBorder="0" data-testid="video" />
      </div>
      <div className="recomendations">
        <h2>Recomended</h2>
        <div className="carocel-recomendations">
          {recommends.map((item, index) => (<Card
            cardTestid={ `${index}-recomendation-card` }
            titleTestid={ `${index}-recomendation-title` }
            key={ index }
            item={ item }
            index={ index }
            type="bebidas"
          />))}
        </div>
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

DetailsFood.propTypes = {
  recipe: objectOf(),
}.isRequired;

export default DetailsFood;
