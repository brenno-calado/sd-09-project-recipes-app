import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import CardDetails from '../components/CardDetails/index';
import { getDrinkDetailsById, getRecommendedFood } from '../services/fetchApi';
import styles from './recipeDetails.module.css';

function DrinkRecipeDetails(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [apiData, setApiData] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [recommendedFood, setRecommendedFood] = useState();
  const six = 6;

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

  function ingredientList() {
    const newArrayOfApiData = apiData.drinks.map((drink) => (
      Object.entries(drink)));

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
        key={ Math.random() }
      >
        { item }
      </li>
    ));
  }

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
            >
              {apiData && ingredientList()}
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
                        <p>{ strMeal }</p>
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
