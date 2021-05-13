import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { Redirect } from 'react-router';
import { Button, Carousel, Spinner } from 'react-bootstrap';
import 'pure-react-carousel/dist/react-carousel.es.css';
import CardDetails from '../components/CardDetails/index';
import { getDrinkDetailsById, getRecommendedFood } from '../services/fetchApi';
import styles from './recipeDetails.module.css';
import useIngredientList from '../hooks/useIngredientList';
import useShouldRedirect from '../hooks/useShoulRedirect';
import useHandleFavoriteDrinks from '../hooks/useHandleFavoriteDrinks';
import { useRecipeContext } from '../contexts/recipeContext';

function DrinkRecipeDetails(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [apiData, setApiData] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [recommendedFood, setRecommendedFood] = useState();
  const [ingredientList] = useIngredientList();
  const [handleClickRedirect, shouldRedirect] = useShouldRedirect();
  const [handleFavorite] = useHandleFavoriteDrinks();
  const [drinksLocal, setDrinkLocal] = useState([]);
  const { btnText, shouldBtnApear } = useRecipeContext();
  const [indexe, setIndexe] = useState(0);

  const six = 6;
  const favoriteParams = { apiData, id, drinksLocal, favorite, setFavorite };

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

  const handleSelect = (selectedIndexe) => {
    setIndexe(selectedIndexe);
  };

  if (shouldRedirect) return <Redirect to={ `/bebidas/${id}/in-progress` } />;
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
              favorite={ favorite }
              shouldVideoApear={ false }
              key={ idDrink }
              image={ strDrinkThumb }
              title={ strDrink }
              isAlcoholic={ strAlcoholic }
              categoryText={ strCategory }
              instructions={ strInstructions }
              handleFavoriteClick={ () => { handleFavorite(favoriteParams); } }
              type="cocktails"
              id={ idDrink }
            >
              {apiData && ingredientList(apiData, match)}
            </CardDetails>
          ))
        )}
        <Carousel
          className={ styles.carouselContainer }
          activeIndex={ indexe }
          onSelect={ handleSelect }
        >
          {recommendedFood && (
            recommendedFood.meals.map(({ strMealThumb, strMeal, idMeal }, index) => (
              index < six && (
                <Carousel.Item>
                  <div
                    key={ idMeal }
                    data-testid={ `${index}-recomendation-card` }
                  >
                    <img
                      className="d-block w-100"
                      src={ strMealThumb }
                      alt={ strMeal }
                    />
                    <Carousel.Caption>
                      <p
                        className={ styles.carouselTitle }
                        data-testid={ `${index}-recomendation-title` }
                      >
                        { strMeal }

                      </p>
                    </Carousel.Caption>
                  </div>
                </Carousel.Item>
              )
            ))
          )}
        </Carousel>
        <Button
          variant="danger"
          style={ { display: shouldBtnApear && 'none' } }
          onClick={ () => { handleClickRedirect(); } }
          className={ styles.startButton }
          data-testid="start-recipe-btn"
          type="button"
        >
          {btnText}
        </Button>
      </>
    );
  }

  return (
    !isFetching ? (
      <Spinner className={ styles.sniper } animation="grow" variant="danger">
        <span className="sr-only">Loading...</span>
      </Spinner>
    ) : renderDetails()
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
