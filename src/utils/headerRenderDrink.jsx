import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';
import BottomMenu from '../components/BottomMenu';
import RecipeCard from '../components/RecepiCard';
import filterAllDrinkButton from './filterAllDrinkButton';
import categoryDrinkButton from './categoryDrinkButton';
import styles from './headerRenderFoodAndDrinks.module.css';

function headerRenderDrink({
  drink,
  render,
  handleClickButtonName,
  twelve,
  handleFetchDrinkClick,
  recipesData,
  setListDrinkByCategory,
  setRecipesData,

}) {
  const renderSearch = recipesData.drinks && (recipesData.drinks
    .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
      index < twelve && (
        <RecipeCard
          key={ idDrink }
          image={ strDrinkThumb }
          name={ strDrink }
          recipeCArdId={ `${index}-recipe-card` }
          cardImageId={ `${index}-card-img` }
          cardNameId={ `${index}-card-name` }
          type="bebidas"
          codeId={ idDrink }
        />
      )
    )));

  return (
    <div className={ styles.container }>
      <HeaderFoods hassearchbar>
        <h1 data-testid="page-title">Bebidas</h1>
      </HeaderFoods>
      <SearchBar>
        <Button
          variant="danger"
          className={ styles.searchBtn }
          onClick={ () => { handleFetchDrinkClick(); } }
          data-testid="exec-search-btn"
          type="button"
        >
          Buscar
        </Button>
      </SearchBar>
      <div className={ styles.filterBtn }>
        { filterAllDrinkButton(setListDrinkByCategory, setRecipesData) }
        {categoryDrinkButton(drink, handleClickButtonName) }
      </div>
      { render || renderSearch ? (
        <div className={ styles.contentContainer }>
          {recipesData.drinks ? renderSearch : render }
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

export default headerRenderDrink;
