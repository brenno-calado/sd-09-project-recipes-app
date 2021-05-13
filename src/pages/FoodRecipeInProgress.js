import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import { Spinner } from 'react-bootstrap';
import { getFoodDetailsById } from '../services/fetchApi';
import CardeInProgress from '../components/CardInProgress';
import useIngredientFoodList from '../hooks/useIngredientFoodList';
import useHandleFavoriteFoods from '../hooks/useHandleFavoriteFoods';
import useHandleCheckFoodValuesValues from '../utils/handleCheckFoodValuesValues';
import styles from './recipeDetails.module.css';

function FoodRecipeInProgress(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [isFetching, setIsFetching] = useState(false);
  const [apiData, setApiData] = useState();
  const [mealLocal, setMealLocal] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [ingredientList] = useIngredientFoodList();
  const [handleFavorite] = useHandleFavoriteFoods();
  const [handleCheckFoodValuesValues, state] = useHandleCheckFoodValuesValues();

  const favoriteParams = { apiData, id, mealLocal, favorite, setFavorite };

  useEffect(() => {
    const repositoresLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (repositoresLocal) {
      setMealLocal(repositoresLocal);
      repositoresLocal.forEach(({ id: favoriteId }) => {
        if (favoriteId === id) {
          setFavorite(true);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    getFoodDetailsById(id)
      .then((items) => {
        setApiData(items);
        setIsFetching(true);
      });
  }, [id]);

  function renderInProgressMeal() {
    return (
      apiData.meals && (
        apiData.meals.map(({
          strMealThumb,
          strMeal,
          strCategory,
          strInstructions,
          idMeal,
          strTags,
        }) => (
          <CardeInProgress
            key={ idMeal }
            image={ strMealThumb }
            title={ strMeal }
            category={ strCategory }
            instructions={ strInstructions }
            favorite={ favorite }
            handleFavorite={ () => handleFavorite(favoriteParams) }
            state={ state }
            id={ id }
            type="meals"
            match={ match }
            tags={ strTags }
          >
            {ingredientList(apiData, match, handleCheckFoodValuesValues)}

          </CardeInProgress>
        ))
      )
    );
  }

  return (
    !isFetching ? (
      <Spinner className={ styles.sniper } animation="grow" variant="danger">
        <span className="sr-only">Loading...</span>
      </Spinner>
    ) : renderInProgressMeal()
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
