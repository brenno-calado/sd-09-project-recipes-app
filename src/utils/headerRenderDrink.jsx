import React from 'react';
import Button from 'react-bootstrap/Button';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';
import BottomMenu from '../components/BottomMenu';
import RecipeCard from '../components/RecepiCard';
import filterAllDrinkButton from './filterAllDrinkButton';
import categoryDrinkButton from './categoryDrinkButton';

function headerRenderDrink({
  drink,
  handleClickButtonName,
  handleFetchDrinkClick,
  twelve,
  recipesData,
  setListDrinkByCategory,
  setRecipesData,
  render,

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
    <>
      <HeaderFoods hassearchbar>
        <h1 data-testid="page-title">Bebidas</h1>
      </HeaderFoods>
      <SearchBar>
        <Button
          onClick={ () => { handleFetchDrinkClick(); } }
          data-testid="exec-search-btn"
          type="button"
        >
          Buscar
        </Button>
      </SearchBar>
      <div style={ { display: 'flex', marginTop: '10px' } }>
        { filterAllDrinkButton(setListDrinkByCategory, setRecipesData) }
        {categoryDrinkButton(drink, handleClickButtonName) }
      </div>
      <div style={ { marginLeft: '-10px', display: 'flex', flexWrap: 'wrap' } }>
        {recipesData.drinks ? renderSearch : render }
      </div>
      <BottomMenu />
    </>
  );
}

export default headerRenderDrink;
