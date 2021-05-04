import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { MyContext } from '../MyContext';
import { mealAPI, drinkAPI, fetchToMainScreen } from '../services/fetchAPI';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Arrow from '../components/Arrow';
import { renderIngredientsList, renderVideo } from '../services/details';

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

  const [currentImageIndex, setCurrentImageIndex] = useState(1);

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

  const renderRecommendations = () => {
    const limitRecommendationsRender = 6;
    const imgUrls = [];
    const previousSlide = () => {
      const lastIndex = imgUrls.length - 1;
      const shouldResetIndex = currentImageIndex === 0;
      const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
      setCurrentImageIndex(index);
    };
    const nextSlide = () => {
      const lastIndex = imgUrls.length - 1;
      const shouldResetIndex = currentImageIndex === lastIndex;
      const index = shouldResetIndex ? 0 : currentImageIndex + 1;
      setCurrentImageIndex(index);
    };
    recommendations.forEach((element, index) => (
      index <= limitRecommendationsRender ? (
        imgUrls.push(element.strMealThumb || element.strDrinkThumb)
      ) : null
    ));
    return (
      <div>
        <Arrow
          clickFunction={ previousSlide }
          glyph="&#9664;"
        />
        <span>
          <img
            src={ imgUrls[currentImageIndex - 1] }
            alt="recommendation"
            width="100"
            height="100"
            data-testid={ `${currentImageIndex - 1}-recomendation-card` }
          />
        </span>
        <span>
          <img
            src={ imgUrls[currentImageIndex] }
            alt="recommendation"
            width="100"
            height="100"
            data-testid={ `${currentImageIndex}-recomendation-card` }
          />
        </span>
        <Arrow
          clickFunction={ nextSlide }
          glyph="&#9654;"
        />
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
          pathname.includes('/comidas') ? renderVideo(data.strYoutube, data.strMeal) : ''
        }
      </section>
      <section data-testid="0-recomendation-card">
        Recomendações
        { renderRecommendations() }
      </section>
    </div>
  );
}
