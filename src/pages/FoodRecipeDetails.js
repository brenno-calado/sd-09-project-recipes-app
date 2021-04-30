import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { Redirect } from 'react-router';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import CardDetails from '../components/CardDetails/index';
import { getFoodDetailsById, getRecommendedDrink } from '../services/fetchApi';
import styles from './recipeDetails.module.css';
import useIngredientFoodList from '../hooks/useIngredientFoodList';
import useShouldRedirect from '../hooks/useShoulRedirect';

function FoodRecipeDetails(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [apiData, setApiData] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [recommendedDrink, setRecommendedDrink] = useState();
  const [favorite, setFavorite] = useState(false);
  const [ingredientList] = useIngredientFoodList();
  const [handleClickRedirect, shouldRedirect] = useShouldRedirect();
  console.log(apiData);
  const six = 6;

  useEffect(() => {
    getRecommendedDrink()
      .then((result) => {
        setRecommendedDrink(result);
      });
  }, []);

  useEffect(() => {
    getFoodDetailsById(id)
      .then((items) => {
        setApiData(items);
        setIsFetching(true);
      });
  }, [id]);

  function handleFavorite() {
    setFavorite(!favorite);
    if (apiData && !favorite) {
      const mealLocalStorage = apiData.meals.map(({
        idMeal,
        strArea,
        strCategory,
        strMeal,
        strMealThumb,
      }) => (
        [{ id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb }]
      ));
      localStorage.setItem('favoriteRecipes', JSON.stringify(mealLocalStorage));
    }
    if (favorite) {
      localStorage.removeItem('favoriteRecipes');
    }
  }

  useEffect(() => {
    if (localStorage.length) {
      setFavorite(true);
    }
  }, []);

  if (shouldRedirect) return <Redirect to={ `/comidas/${id}/in-progress` } />;

  function renderDetails() {
    return (
      <>
        {apiData.meals && (
          apiData.meals.map(({
            strMealThumb,
            strMeal,
            strYoutube,
            strCategory,
            strInstructions,
            idMeal,
          }) => (
            <CardDetails
              shouldVideoApear
              key={ idMeal }
              image={ strMealThumb }
              title={ strMeal }
              video={ strYoutube }
              categoryText={ strCategory }
              instructions={ strInstructions }
              handleFavoriteClick={ handleFavorite }
              favorite={ favorite }
            >
              { apiData && ingredientList(apiData)}
            </CardDetails>
          ))
        )}
        <div className={ styles.scrollingWrapper }>
          <CarouselProvider
            naturalSlideWidth={ 10 }
            naturalSlideHeight={ 10 }
            totalSlides={ 6 }
            infinite
            visibleSlides={ 2 }
          >
            <Slider>
              {recommendedDrink && (
                recommendedDrink.drinks.map((
                  { strDrinkThumb, strDrink, idDrink }, index,
                ) => (
                  index < six && (
                    <Slide index={ index }>
                      <div
                        key={ idDrink }
                        data-testid={ `${index}-recomendation-card` }
                      >
                        <img
                          className={ styles.details }
                          src={ strDrinkThumb }
                          alt={ strDrink }
                        />
                        <p data-testid={ `${index}-recomendation-title` }>{ strDrink }</p>
                      </div>
                    </Slide>
                  )
                ))
              )}
            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>

          </CarouselProvider>
        </div>
        <button
          onClick={ () => { handleClickRedirect(); } }
          className={ styles.startButton }
          data-testid="start-recipe-btn"
          type="button"
        >
          Iniciar receita
        </button>
      </>
    );
  }

  return (
    !isFetching ? <p>loading</p> : renderDetails()
  );
}

FoodRecipeDetails.propTypes = {
  match: shape(),
  params: shape(),
  id: string,
};

FoodRecipeDetails.defaultProps = {
  match: {},
  params: {},
  id: '',
};

export default FoodRecipeDetails;
