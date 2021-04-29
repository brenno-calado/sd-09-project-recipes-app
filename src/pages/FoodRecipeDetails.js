import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import CardDetails from '../components/CardDetails/index';
import { getFoodDetailsById, getRecommendedDrink } from '../services/fetchApi';
import styles from './recipeDetails.module.css';

function FoodRecipeDetails(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [apiData, setApiData] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [recommendedDrink, setRecommendedDrink] = useState();

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

  function ingredientList() {
    const newArrayOfApiData = apiData.meals.map((meal) => (
      Object.entries(meal)));

    const recipeItems = [];
    let number = 1;
    newArrayOfApiData[0].forEach((item) => {
      if (item[0] === `strIngredient${number}` && item[1] !== null) {
        const ingredient = item[1];
        newArrayOfApiData[0].forEach((item2) => {
          if (item2[0] === `strMeasure${number}` && item2[1] !== '') {
            const measure = item2[1];
            recipeItems.push([ingredient, ': ', measure]);
          }
        });
        number += 1;
      }
    });

    return recipeItems.map((item, index) => (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ item }
      >
        { item }
      </li>
    ));
  }

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
            >
              { apiData && ingredientList()}
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
                recommendedDrink.drinks.map(({ strDrinkThumb, strDrink, idDrink }, index) => (
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
