import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';
import BottomMenu from '../components/BottomMenu';
import RecipeCard from '../components/RecepiCard';
import filterAllFoodButton from './filterAllFoodButton';
import categoryFoodButton from './categoryFoodButton';
import styles from './headerRenderFoodAndDrinks.module.css';

function headerRenderFoods({
  meal,
  render,
  handleClickButtonName,
  twelve,
  handleFetchFoodClick,
  recipesData,
  setListItemByCategory,
  setRecipesData,
  // renderRecipesByIngredients,
}) {
  const renderFood = (recipesData.meals
    && (recipesData.meals
      .map(({ idMeal, strMealThumb, strMeal }, index) => (
        index < twelve && (
          <RecipeCard
            key={ idMeal }
            image={ strMealThumb }
            name={ strMeal }
            recipeCArdId={ `${index}-recipe-card` }
            cardImageId={ `${index}-card-img` }
            cardNameId={ `${index}-card-name` }
            type="comidas"
            codeId={ idMeal }
          />
        )
      ))
    ));

  return (
    <div className={ styles.container }>
      <HeaderFoods hassearchbar>
        <h1 data-testid="page-title">Comidas</h1>
      </HeaderFoods>
      <SearchBar>
        <Button
          variant="danger"
          className={ styles.searchBtn }
          onClick={ () => { handleFetchFoodClick(); } }
          data-testid="exec-search-btn"
          type="button"
        >
          Buscar
        </Button>
      </SearchBar>
      <div className={ styles.filterBtn }>
        { filterAllFoodButton(setListItemByCategory, setRecipesData) }
        { categoryFoodButton(handleClickButtonName, meal) }
      </div>
      { render.length || recipesData.meals ? (
        <div className={ styles.contentContainer }>
          {recipesData.meals ? renderFood : render}
          {/* {renderRecipesByIngredients} */}
        </div>
      ) : (
        <Spinner className={ styles.sniper } animation="grow" variant="danger">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <BottomMenu />
    </div>
  );
}

export default headerRenderFoods;
