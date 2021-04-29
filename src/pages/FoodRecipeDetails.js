import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import CardDetails from '../components/CardDetails/index';
import { getFoodDetailsById, getRecommendedFood } from '../services/fetchApi';

function FoodRecipeDetails(props) {
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

  console.log('recomendações', recommendedFood);

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
        {recommendedFood && (
          recommendedFood.meals.map(({ strMealThumb, strMeal, idMeal }, index) => (
            index < six && (
              <div key={ idMeal } data-testid={ `${index}-recomendation-card` }>
                <img src={ strMealThumb } alt={ strMeal } />
                <p>{ strMeal }</p>
              </div>
            )
          ))
        )}
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
