import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import { getFoodDetailsById } from '../services/fetchApi';
import CardeInProgress from '../components/CardInProgress';
import useIngredientFoodList from '../hooks/useIngredientFoodList';

function FoodRecipeInProgress(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [isFetching, setIsFetching] = useState(false);
  const [apiData, setApiData] = useState();
  const [ingredientList] = useIngredientFoodList();

  useEffect(() => {
    getFoodDetailsById(id)
      .then((items) => {
        setApiData(items);
        setIsFetching(true);
      });
  }, [id]);

  function handleCheckedValue({ target }) {
    if (target.checked) {
      const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const getFilteredLocal = getLocal && getLocal.meals[id]
        .filter((item, index) => getLocal.meals[id].indexOf(item) === index);

      const localFoods = {
        meals: {
          [id]: getLocal ? [...getFilteredLocal, target.name] : [target.name],
        },
      };

      localStorage.setItem('inProgressRecipes',
        JSON.stringify(localFoods));
    }

    if (!target.checked) {
      const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));

      const removeLocal = getLocal && getLocal.meals[id]
        .filter((item) => item !== target.name);

      const localFoods = {
        meals: {
          [id]: removeLocal,
        },
      };

      localStorage.setItem('inProgressRecipes',
        JSON.stringify(localFoods));
    }
  }

  function renderInProgressMeal() {
    return (
      apiData.meals && (
        apiData.meals.map(({
          strMealThumb,
          strMeal,
          strCategory,
          strInstructions,
          idMeal,
        }) => (
          <CardeInProgress
            key={ idMeal }
            image={ strMealThumb }
            title={ strMeal }
            category={ strCategory }
            instructions={ strInstructions }
          >
            {ingredientList(apiData, match, handleCheckedValue)}

          </CardeInProgress>
        ))
      )
    );
  }

  return (
    !isFetching ? <p>loading</p> : renderInProgressMeal()
  );
}

FoodRecipeInProgress.propTypes = {
  match: shape(),
  params: shape(),
  id: string,
};

FoodRecipeInProgress.defaultProps = {
  match: {},
  params: {},
  id: '',
};

export default FoodRecipeInProgress;
