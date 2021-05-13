import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { Spinner } from 'react-bootstrap';
import { getDrinkDetailsById } from '../services/fetchApi';
import CardeInProgress from '../components/CardInProgress';
import useIngredientList from '../hooks/useIngredientList';
import useHandleFavoriteDrinks from '../hooks/useHandleFavoriteDrinks';
import useHandleCheckDrinkValues from '../utils/handleCheckDrinkValues';
import styles from './recipeDetails.module.css';

function DrinkRecipeInProgress(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [isFetching, setIsFetching] = useState(false);
  const [apiData, setApiData] = useState();
  const [handleFavorite] = useHandleFavoriteDrinks();
  const [drinksLocal, setDrinkLocal] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const favoriteParams = { apiData, id, drinksLocal, favorite, setFavorite };
  const [ingredientList] = useIngredientList();
  const [handleCheckDrinkValues] = useHandleCheckDrinkValues();

  useEffect(() => {
    const repositoresLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (repositoresLocal) {
      setDrinkLocal(repositoresLocal);
      repositoresLocal.forEach(({ id: favoriteId }) => {
        if (favoriteId === id) {
          setFavorite(true);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    getDrinkDetailsById(id)
      .then((items) => {
        setApiData(items);
        setIsFetching(true);
      });
  }, [id]);

  function renderInprogressDrink() {
    return (
      apiData.drinks && (
        apiData.drinks.map(({
          strDrinkThumb,
          strDrink,
          strInstructions,
          strAlcoholic,
          strTags,
          strCategory,
        }) => (
          <CardeInProgress
            key={ Math.random() }
            image={ strDrinkThumb }
            title={ strDrink }
            category={ strAlcoholic }
            instructions={ strInstructions }
            handleFavorite={ () => handleFavorite(favoriteParams) }
            favorite={ favorite }
            id={ id }
            type="cocktails"
            match={ match }
            tags={ strTags }
            style={ strCategory }
          >
            {ingredientList(apiData, match, handleCheckDrinkValues)}
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
    ) : renderInprogressDrink()
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
