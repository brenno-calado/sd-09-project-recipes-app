import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeDetails } from '../services/api';

function DrinksDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => setData(await fetchRecipeDetails(id, false));
    getData();
  }, [id]);

  const ingredients = Object.keys(data).filter((el) => el.includes('strIngredient'));
  const measures = Object.keys(data).filter((el) => el.includes('strMeasure'));

  const { strDrinkThumb, strDrink, strInstructions, strYoutube, strAlcoholic } = data;

  return (
    <section>
      <img data-testid="recipe-photo" src={ strDrinkThumb } alt="recipe" />
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Favoritar</button>
      <p data-testid="recipe-category">{ strAlcoholic }</p>
      { ingredients.map((ingredient, index) => (
        <p data-testid={ `${index}-ingredient-name-and-measure` } key={ ingredient }>
          { data[ingredient] && `${data[ingredient]} ${data[measures[index]]}` }
        </p>
      )) }
      <iframe
        data-testid="video"
        width="560"
        height="315"
        title={ strDrink }
        src={ strYoutube && `https://www.youtube.com/embed/${strYoutube.split('=')[1]}` }
        frameBorder="0"
        allow="accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture"
        allowFullScreen
      />
      <p data-testid="instructions">{strInstructions}</p>
      <span data-testid="0-recomendation-card">Card de Recomendaçoes</span>
      <span data-testid="1-recomendation-card">Card de Recomendaçoes</span>
      <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
    </section>
  );
}

export default DrinksDetails;
