import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import CardDetails from '../components/CardDetails/index';
import { getDrinkDetailsById, getRecommendedDrink } from '../services/fetchApi';

function DrinkRecipeDetails(props) {
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

  console.log('recomendações', recommendedDrink);

  useEffect(() => {
    getDrinkDetailsById(id)
      .then((items) => {
        setApiData(items);
        setIsFetching(true);
      });
  }, [id]);

  console.log(apiData);

  function ingredientList() {
    const newArrayOfApiData = apiData.drinks.map((drink) => (
      Object.entries(drink)));
    console.log(newArrayOfApiData);

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
        {recommendedDrink && (
          recommendedDrink.drinks.map(({ strDrinkThumb, strDrink, idDrink }, index) => (
            index < six && (
              <div key={ idDrink } data-testid={ `${index}-recomendation-card` }>
                <img src={ strDrinkThumb } alt={ strDrink } />
                <p>{ strDrink }</p>
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
