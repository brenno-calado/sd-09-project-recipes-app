import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import CardDetails from '../components/CardDetails/index';
import { getFoodDetailsById } from '../services/fetchApi';

function FoodRecipeDetails(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [apiData, setApiData] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getFoodDetailsById(id)
      .then((items) => {
        setApiData(items);
        setIsFetching(true);
      });
  }, [id]);

  console.log(apiData);
  if (apiData) {
    const test = apiData.meals.map((item, index) => {
      return Object.entries(item)
    })
    console.log(test);
  }

  function renderDetails() {
    return (
      apiData.meals && (
        apiData.meals.map(({
          strMealThumb,
          strMeal,
          strYoutube,
          strCategory,
          strInstructions,
          idMeal,
        }, index) => (
          <CardDetails
            key={ idMeal }
            image={ strMealThumb }
            title={ strMeal }
            video={ strYoutube }
            categoryText={ strCategory }
            instructions={ strInstructions }
            // ingredient={}
            ingredientId={ '0-ingredient-name-and-measure' }
            recommendedId={'0-recomendation-card'}
            // recomendedImage={}
            // recomendedTitle={}
          />
        ))
      )
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

// sabemos que o número de strIngredient[#] é = o número de strMeasure[#], então:
// let quantidade = #;
// for (index = 0; index <= #; index += 1) {
//   if(strIngredient[#] !== '') {
//     <li>`${strIngredient[quantidade]} - ${strMeasure[quantidade]}</li>
//   quantidade = quantidade + 1
//   }
// }