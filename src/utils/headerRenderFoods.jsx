import React from 'react';
import Button from 'react-bootstrap/Button';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';
import BottomMenu from '../components/BottomMenu';
import RecipeCard from '../components/RecepiCard';
import filterAllFoodButton from './filterAllFoodButton';
import categoryFoodButton from './categoryFoodButton';

function headerRenderFoods({
  meal,
  render,
  handleClickButtonName,
  twelve,
  handleFetchFoodClick,
  recipesData,
  setListItemByCategory,
  setRecipesData,
  renderRecipesByIngredients,
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
    <>
      <HeaderFoods hassearchbar>
        <h1 data-testid="page-title">Comidas</h1>
      </HeaderFoods>
      <SearchBar>
        <Button
          onClick={ () => { handleFetchFoodClick(); } }
          data-testid="exec-search-btn"
          type="button"
        >
          Buscar
        </Button>
      </SearchBar>
      <div style={ { display: 'flex', marginTop: '10px' } }>
        { filterAllFoodButton(setListItemByCategory, setRecipesData) }
        { categoryFoodButton(handleClickButtonName, meal) }
      </div>
      <div style={ { marginLeft: '-10px', display: 'flex', flexWrap: 'wrap' } }>
        {recipesData.meals ? renderFood : render}
        {renderRecipesByIngredients}
      </div>
      <BottomMenu />
    </>
  );
}

export default headerRenderFoods;
