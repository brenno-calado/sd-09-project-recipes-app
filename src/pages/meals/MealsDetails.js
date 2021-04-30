import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeDetails } from '../../services/api';
import { DrinksRecomendations, YoutubePlayer } from '../../components';

function MealsDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => setData(await fetchRecipeDetails(id, true));
    getData();
  }, [id]);

  const ingredients = Object.keys(data).filter((el) => el.includes('strIngredient'));
  const measures = Object.keys(data).filter((el) => el.includes('strMeasure'));
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = data;

  return (
    <section className="recipe-details">
      <img data-testid="recipe-photo" src={ strMealThumb } alt="recipe" />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Favoritar</button>
      <p data-testid="recipe-category">{ strCategory }</p>
      { ingredients.map((ingredient, index) => (
        <p data-testid={ `${index}-ingredient-name-and-measure` } key={ ingredient }>
          { `${data[ingredient]} ${data[measures[index]]}` }
          <input data-testid="ingredient-step" type="checkbox" />
        </p>)) }
      <p data-testid="instructions">{strInstructions}</p>
      <YoutubePlayer url={ strYoutube } title={ strMeal } />
      <span data-testid="0-recomendation-card">Card de Recomendaçoes</span>
      <span data-testid="1-recomendation-card">Card de Recomendaçoes</span>
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="btn-initial"
      >
        Iniciar Receita
      </button>
      <DrinksRecomendations />
    </section>
  );
}

export default MealsDetails;
