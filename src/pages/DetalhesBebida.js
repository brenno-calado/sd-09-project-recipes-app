import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDrinkIdDetails } from '../services';
import shareImg from '../images/shareIcon.svg';
import whiteHeartImg from '../images/whiteHeartIcon.svg';

const DetalhesBebida = () => {
  const { id } = useParams();
  const [idDetails, setIdDetails] = useState([]);
  const fetchDetails = async () => {
    const results = await getDrinkIdDetails(id);
    setIdDetails(results);
  };
  const getIngredients = () => {
    const ingredientsAndMeasurements = Object.entries(idDetails).filter(
      (details) => {
        const condition1 = details[0].includes('Ingredient')
        || details[0].includes('Measure');
        const condition2 = details[1] !== '' && details[1] !== null;
        return condition1 && condition2;
      },
    );
    console.log(ingredientsAndMeasurements);
    return (null);
  };
  useEffect(() => { fetchDetails(); }, []);
  if (!idDetails) return <p>Carregando...</p>;
  const { strDrinkThumb,
    strDrink, strCategory, strIngredient1, strMeasure1, strInstructions } = idDetails;

  return (
    <div>
      <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <button type="button" data-testid="share-btn">
        <img src={ shareImg } alt="Compartilhar" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartImg } alt="Favoritar" />
      </button>
      <p data-testid="recipe-category">{strCategory}</p>
      <p data-testid="0-ingredient-name-and-measure">
        {strIngredient1}
        {strMeasure1}
      </p>
      <p data-testid="instructions">{strInstructions}</p>
      <p data-testid="0-recomendation-card">comidas recomendadas</p>
      <button type="button" data-testid="start-recipe-btn">
        Iniciar Receita
      </button>
      { getIngredients()}
    </div>
  );
};

export default DetalhesBebida;
