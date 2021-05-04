import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import { MyContext } from '../MyContext';
import { mealAPI, drinkAPI, fetchToMainScreen } from '../services/fetchAPI';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function Detalhes() {
  const { pathname } = useLocation();
  const recipeId = pathname.substring(pathname.lastIndexOf('/') + 1);
  const {
    data,
    setData,
    isLoading,
    setIsLoading,
    filterIngredients,
    setRecommendations,
    recommendations } = useContext(MyContext);

  useEffect(() => {
    if (pathname.includes('comidas')) {
      mealAPI('id', recipeId).then((result) => {
        setData(result);
        setIsLoading(false);
        fetchToMainScreen('/bebidas').then((recommendation) => {
          setRecommendations(recommendation);
        });
      });
    } else if (pathname.includes('bebidas')) {
      drinkAPI('id', recipeId).then((result) => {
        setData(result);
        setIsLoading(false);
        fetchToMainScreen('/comidas').then((recommendation) => {
          setRecommendations(recommendation);
        });
      });
    }
  }, [setIsLoading, setData, pathname, recipeId, setRecommendations]);

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

  const renderRecommendations = () => {
    const limitRecommendationsRender = 6;
    return (
      <div>
        {recommendations.map((element, index) => (
          index <= limitRecommendationsRender ? (
            <li data-testid={ `${index}-card-name` }>{ element.strMeal }</li>
          ) : null
        ))}
      </div>
    );
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
        {renderIngredientsList(filterIngredients(data))}
      </ul>
      <p data-testid="instructions">{ data.strInstructions }</p>
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
      <section data-testid="video">
        {
          pathname.includes('/comidas') ? renderVideo(data.strYoutube) : ''
        }
      </section>
      <section data-testid="0-recomendation-card">
        Recomendações
        <ul>
          { renderRecommendations() }
        </ul>
      </section>
    </div>
  );
}
