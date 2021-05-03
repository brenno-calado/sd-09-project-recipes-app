import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { getDrinkDetailsById } from '../services/fetchApi';
import CardeInProgress from '../components/CardInProgress';
import useIngredientList from '../hooks/useIngredientList';

function DrinkRecipeInProgress(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [isFetching, setIsFetching] = useState(false);
  const [apiData, setApiData] = useState();

  const [ingredientList] = useIngredientList();

  useEffect(() => {
    getDrinkDetailsById(id)
      .then((items) => {
        setApiData(items);
        setIsFetching(true);
      });
  }, [id]);

  function handleCheckedValue({ target }) {
    if (target.checked) {
      const drinkId = apiData.drinks[0].idDrink;
      const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));

      const getFilteredLocal = getLocal && getLocal.cocktails[drinkId]
        .filter((item, index) => getLocal.cocktails[drinkId].indexOf(item) === index);

      const localDrinks = {
        cocktails: {
          [drinkId]: getLocal ? [...getFilteredLocal, target.name] : [target.name],
        },
      };

      localStorage.setItem('inProgressRecipes',
        JSON.stringify(localDrinks));
    }

    if (!target.checked) {
      const drinkId = apiData.drinks[0].idDrink;
      const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));

      const removeLocal = getLocal && getLocal.cocktails[drinkId]
        .filter((item) => item !== target.name);

      const localDrinks = {
        cocktails: {
          [drinkId]: removeLocal,
        },
      };

      localStorage.setItem('inProgressRecipes',
        JSON.stringify(localDrinks));
      console.log('descheck', getLocal);
    }
  }

  function renderInprogressDrink() {
    return (
      apiData.drinks && (
        apiData.drinks.map(({
          strDrinkThumb,
          strDrink,
          // strCategory,
          strInstructions,
          strAlcoholic,
        }) => (
          <CardeInProgress
            key={ Math.random() }
            image={ strDrinkThumb }
            title={ strDrink }
            category={ strAlcoholic }
            instructions={ strInstructions }
          >
            {ingredientList(apiData, match, handleCheckedValue)}

          </CardeInProgress>
        ))
      )
    );
  }

  return (
    !isFetching ? <p>loading</p> : renderInprogressDrink()
  );
}

DrinkRecipeInProgress.propTypes = {
  match: shape(),
  params: shape(),
  id: string,
};

DrinkRecipeInProgress.defaultProps = {
  match: {},
  params: {},
  id: '',
};

export default DrinkRecipeInProgress;
