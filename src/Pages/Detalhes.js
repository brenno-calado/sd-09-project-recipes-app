import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import { MyContext } from '../MyContext';
import { mealAPI, drinkAPI } from '../services/fetchAPI';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function Detalhes() {
  const { pathname } = useLocation();
  const recipeId = pathname.substring(pathname.lastIndexOf('/') + 1);
  const { data, setData, isLoading,
    setIsLoading, filterIngredients } = useContext(MyContext);

  useEffect(() => {
    if (pathname.includes('comidas')) {
      mealAPI('id', recipeId).then((result) => {
        setData(result);
        setIsLoading(false);
      });
    } else if (pathname.includes('bebidas')) {
      drinkAPI('id', recipeId).then((result) => {
        setData(result);
        setIsLoading(false);
      });
    }
  }, [setIsLoading, setData, pathname, recipeId]);

  const renderIngredientsList = (list) => (
    list.map((item, index) => (
      <li
        key={ item }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        { item }
      </li>
    ))
  );

  const renderVideo = (url) => {
    if (url !== undefined) {
      const recipeUrl = url.split('=')[1];
      return (
        <iframe
          width="600"
          height="400"
          src={ `https://www.youtube.com/embed/${recipeUrl}` }
          title={ data.strMeal }
        />);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <img
        className="recipe-image"
        src={ data.strMealThumb }
        alt={ data.strMeal }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ data.strMeal }</h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <button
        type="button"
      >
        <img
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          alt="Favorite"
        />
      </button>
      <h2 data-testid="recipe-category">{`Categoria: ${data.strCategory}`}</h2>
      <ul>
        { renderIngredientsList(filterIngredients(data)) }
      </ul>
      <p data-testid="instructions">{ data.strInstructions }</p>
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
      <section data-testid="video">{ renderVideo(data.strYoutube) }</section>
      <section data-testid="0-recomendation-card">Recomendações</section>
    </div>
  );
}
