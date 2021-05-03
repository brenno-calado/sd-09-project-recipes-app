import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { Redirect } from 'react-router';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import CardDetails from '../components/CardDetails/index';
import { getDrinkDetailsById, getRecommendedFood } from '../services/fetchApi';
import styles from './recipeDetails.module.css';
import useIngredientList from '../hooks/useIngredientList';
import useShouldRedirect from '../hooks/useShoulRedirect';

function DrinkRecipeDetails(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [apiData, setApiData] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [recommendedFood, setRecommendedFood] = useState();
  const [favorite, setFavorite] = useState(false);
  const [ingredientList] = useIngredientList();
  const [handleClickRedirect, shouldRedirect] = useShouldRedirect();
  const six = 6;

  console.log(apiData);

  useEffect(() => {
    getRecommendedFood()
      .then((result) => {
        setRecommendedFood(result);
      });
  }, []);

  useEffect(() => {
    getDrinkDetailsById(id)
      .then((items) => {
        setApiData(items);
        setIsFetching(true);
      });
  }, [id]);

  function handleFavorite() {
    setFavorite(!favorite);
    if (apiData && !favorite) {
      const mealLocalStorage = apiData.drinks.map(({
        idDrink,
        strArea,
        strCategory,
        strAlcoholic,
        strDrink,
        strMealThumb,
      }) => (
        [{ id: idDrink,
          type: 'bebida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
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

  if (shouldRedirect) return <Redirect to={ `/bebidas/${id}/in-progress` } />;
  function renderDetails() {
    return (
      <>
        { apiData.drinks && (
          apiData.drinks.map(({
            strDrinkThumb,
            strDrink,
            strCategory,
            strInstructions,
            idDrink,
            strAlcoholic,
          }) => (
            <CardDetails
              shouldVideoApear={ false }
              key={ idDrink }
              image={ strDrinkThumb }
              title={ strDrink }
              isAlcoholic={ strAlcoholic }
              categoryText={ strCategory }
              instructions={ strInstructions }
              handleFavoriteClick={ handleFavorite }
              favorite={ favorite }
            >
              {apiData && ingredientList(apiData)}
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
              {recommendedFood && (
                recommendedFood.meals.map(({ strMealThumb, strMeal, idMeal }, index) => (
                  index < six && (
                    <Slide index={ index }>
                      <div
                        key={ idMeal }
                        data-testid={ `${index}-recomendation-card` }
                      >
                        <img
                          className={ styles.details }
                          src={ strMealThumb }
                          alt={ strMeal }
                        />
                        <p data-testid={ `${index}-recomendation-title` }>{ strMeal }</p>
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

DrinkRecipeDetails.propTypes = {
  match: shape(),
  params: shape(),
  id: string,
};

DrinkRecipeDetails.defaultProps = {
  match: {},
  params: {},
  id: '',
};

export default DrinkRecipeDetails;
