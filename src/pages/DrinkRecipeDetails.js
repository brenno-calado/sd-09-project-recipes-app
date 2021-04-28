import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import CardDetails from '../components/CardDetails/index';
import { getDrinkDetailsById } from '../services/fetchApi';

function DrinkRecipeDetails(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [apiData, setApiData] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getDrinkDetailsById(id)
      .then((items) => {
        setApiData(items);
        setIsFetching(true);
      });
  }, [id]);

  console.log(apiData);

  function renderDetails() {
    return (
      apiData.drinks && (
        apiData.drinks.map(({
          strDrinkThumb,
          strDrink,
          strYoutube,
          strCategory,
          strInstructions,
          idDrink,
        }, index) => (
          <CardDetails
            key={ idDrink }
            image={ strDrinkThumb }
            title={ strDrink }
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
