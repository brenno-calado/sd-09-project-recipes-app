import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { MyContext } from '../MyContext';
import { mealAPI, drinkAPI, fetchToMainScreen } from '../services/fetchAPI';
import Arrow from '../components/Arrow';
import { renderIngredientsList, renderVideo, saveAsFavorite } from '../services/details';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

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
  const [isFavorite, setIsFavorite] = useState(false);
  const [foodOrDrink, setType] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (pathname.includes('comidas')) {
      mealAPI('id', recipeId).then((result) => {
        setData(result);
        setType('Meal');
        setIsLoading(false);
        fetchToMainScreen('/bebidas').then((recommendation) => {
          setRecommendations(recommendation);
        });
        const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const initialFavoriteState = getFavorite.some((recipe) => recipe.id === recipeId);
        setIsFavorite(initialFavoriteState);
      });
    } else if (pathname.includes('bebidas')) {
      drinkAPI('id', recipeId).then((result) => {
        setData(result);
        setType('Drink');
        setIsLoading(false);
        fetchToMainScreen('/comidas').then((recommendation) => {
          setRecommendations(recommendation);
        });
        const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const initialFavoriteState = getFavorite.some((recipe) => recipe.id === recipeId);
        setIsFavorite(initialFavoriteState);
      });
    }
  }, [setIsLoading, setData, pathname, recipeId, setRecommendations, setType]);

  const previousSlide = (imgUrls) => {
    const lastIndex = imgUrls.length - 1;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
    setCurrentImageIndex(index);
  };

  const nextSlide = (imgUrls) => {
    const lastIndex = imgUrls.length - 1;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(index);
  };

  const renderRecommendations = () => {
    const limitRecommendationsRender = 6;
    const imgUrls = [];
    recommendations.forEach((element, index) => (
      index <= limitRecommendationsRender ? (
        imgUrls.push(element.strMealThumb || element.strDrinkThumb)
      ) : null
    ));
    return (
      <div>
        <Arrow
          clickFunction={ () => previousSlide(imgUrls) }
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
          clickFunction={ () => nextSlide(imgUrls) }
          glyph="&#9654;"
        />
      </div>
    );
  };

  const saveFavorite = () => {
    setIsFavorite(!isFavorite);
    saveAsFavorite(recipeId, data, pathname);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <img
        className="recipe-image"
        src={ data[`str${foodOrDrink}Thumb`] }
        alt={ data[`str${foodOrDrink}`] }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        { data[`str${foodOrDrink}`] }
      </h1>
      <ShareButton />
      <FavoriteButton onClick={ saveFavorite } isFavorite={ isFavorite } />
      <h2 data-testid="recipe-category">
        Categoria:
        {
          pathname.includes('/comidas')
            ? data.strCategory : data.strAlcoholic
        }
      </h2>
      <ul>
        {renderIngredientsList(filterIngredients(data))}
      </ul>
      <p data-testid="instructions">{ data.strInstructions }</p>
      <section>
        {
          pathname.includes('/comidas') ? renderVideo(data.strYoutube, data.strMeal) : ''
        }
      </section>
      <section>
        Recomendações
        { renderRecommendations() }
      </section>
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ {
          position: 'fixed',
          bottom: 0,
          zIndex: 1,
        } }
        onClick={ () => history.push(`${pathname}/in-progress`) }
      >
        Iniciar Receita
      </button>
    </div>
  );
}
