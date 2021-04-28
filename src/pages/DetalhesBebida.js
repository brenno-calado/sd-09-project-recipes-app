import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getDrinkIdDetails } from '../services';
import { AppContext } from '../context/AppContext';
import shareImg from '../images/shareIcon.svg';
import whiteHeartImg from '../images/whiteHeartIcon.svg';

const MAX_ITEMS = 6;

const DetalhesBebida = () => {
  const { id } = useParams();
  const [idDetails, setIdDetails] = useState([]);
  const { foods } = useContext(AppContext);

  const getIngredients = () => {
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
    const objIngredients = ingredients.reduce((acc, curr, index) => {
      acc.push({ name: curr[1], index });
      return acc;
    }, []);
    const objMeasure = measure.reduce((acc, curr, index) => {
      acc.push({ measure: curr[1], index });
      return acc;
    }, []);

    return objIngredients.map((ingredient) => {
      const measurament = objMeasure
        .filter((xablau) => ingredient.index === xablau.index);
      return { name: ingredient.name, measure: measurament[0].measure };
    });
  };

  const fetchDetails = async (identification) => {
    const results = await getDrinkIdDetails(identification);
    setIdDetails(results);
  };

  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  if (!idDetails) return <p>Carregando...</p>;
  const { strDrinkThumb,
    strDrink, strCategory, strInstructions } = idDetails;

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
      { idDetails && getIngredients().map((ingredient, index) => (
        <p data-testid={ `${index}-ingredient-name-and-measure` } key={ ingredient.name }>
          {`${ingredient.name} ${ingredient.measure === null ? '' : ingredient.measure}`}
        </p>
      )) }
      <p data-testid="instructions">{strInstructions}</p>
      <p data-testid="0-recomendation-card">comidas recomendadas</p>
      { foods && foods.splice(0, MAX_ITEMS).map((food, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ food.idMeal }>
          <img
            data-testid={ `${index}-card-img` }
            src={ food.strMealThumb }
            alt={ food.strMeal }
            width="100px"
          />
          <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
        </div>
      )) }
      <button type="button" data-testid="start-recipe-btn">
        Iniciar Receita
      </button>
    </div>
  );
};

export default DetalhesBebida;
