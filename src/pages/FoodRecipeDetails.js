import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { Redirect } from 'react-router';
import { Button, Carousel, Spinner } from 'react-bootstrap';
import 'pure-react-carousel/dist/react-carousel.es.css';
import CardDetails from '../components/CardDetails/index';
import { getFoodDetailsById, getRecommendedDrink } from '../services/fetchApi';
import styles from './recipeDetails.module.css';
import useIngredientFoodList from '../hooks/useIngredientFoodList';
import useShouldRedirect from '../hooks/useShoulRedirect';
import useHandleFavoriteFoods from '../hooks/useHandleFavoriteFoods';
import useHandleCheckFoodValuesValues from '../utils/handleCheckFoodValuesValues';
import { useRecipeContext } from '../contexts/recipeContext';

function FoodRecipeDetails(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [apiData, setApiData] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [recommendedDrink, setRecommendedDrink] = useState();
  const [ingredientList] = useIngredientFoodList();
  const [handleClickRedirect, shouldRedirect] = useShouldRedirect();
  const [handleFavorite] = useHandleFavoriteFoods();
  const [handleCheckFoodValuesValues] = useHandleCheckFoodValuesValues();
  const [mealLocal, setMealLocal] = useState([]);
  const { btnText, shouldBtnApear } = useRecipeContext();
  const [indexe, setIndexe] = useState(0);

  const six = 6;
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
    getRecommendedDrink()
      .then((result) => {
        setRecommendedDrink(result);
      });
  }, []);

  useEffect(() => {
    getFoodDetailsById(id)
      .then((items) => {
        setApiData(items);
        setIsFetching(true);
      });
  }, [id]);

  const handleSelect = (selectedIndexe) => {
    setIndexe(selectedIndexe);
  };

  if (shouldRedirect) return <Redirect to={ `/comidas/${id}/in-progress` } />;

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
            strArea,
            strTags,
          }) => (
            <CardDetails
              shouldVideoApear
              key={ idMeal }
              image={ strMealThumb }
              title={ strMeal }
              video={ strYoutube }
              categoryText={ strCategory }
              instructions={ strInstructions }
              handleFavoriteClick={ () => { handleFavorite(favoriteParams); } }
              favorite={ favorite }
              type="meals"
              id={ idMeal }
              area={ strArea }
              match={ match }
              tags={ strTags }
              style={ strCategory }
            >
              { apiData && ingredientList(apiData, match, handleCheckFoodValuesValues)}
            </CardDetails>
          ))
        )}
        <Carousel
          className={ styles.carouselContainer }
          activeIndex={ indexe }
          onSelect={ handleSelect }
        >
          {recommendedDrink && (
            recommendedDrink.drinks.map((
              { strDrinkThumb, strDrink, idDrink }, index,
            ) => (
              index < six && (
                <Carousel.Item>
                  <div
                    key={ idDrink }
                    data-testid={ `${index}-recomendation-card` }
                  >
                    <img
                      style={ { height: '400px', objectFit: 'cover' } }
                      className="d-block w-100"
                      src={ strDrinkThumb }
                      alt={ strDrink }
                    />
                    <Carousel.Caption>
                      <p
                        className={ styles.carouselTitle }
                        data-testid={ `${index}-recomendation-title` }
                      >
                        { strDrink }

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
