import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';
import { useRecipeContext } from '../contexts/recipeContext';
import BottomMenu from '../components/BottomMenu';
import RecipeCard from '../components/RecepiCard';

function Drinks() {
  const [drink, setDrink] = useState([]);
  const [categoryDrink, setCategoryDrink] = useState();
  const [listDrinkByCategory, setListDrinkByCategory] = useState([]);
  const [checked, setChecked] = useState(false);

  const { handleFetchDrinkClick,
    recipesData,
    handleFetchRecipes,
    getRecipesByCategory,
    getRecipesDrinksFilterByCategory } = useRecipeContext();
  const twelve = 12;

  useEffect(() => {
    if (recipesData === 'Unexpected end of JSON input'
      || recipesData.drinks === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [recipesData]);

  useEffect(() => {
    handleFetchRecipes('thecocktaildb');
  }, [handleFetchRecipes]);

  useEffect(() => {
    getRecipesByCategory('thecocktaildb')
      .then(({ drinks }) => setDrink(drinks));
  }, [getRecipesByCategory]);

  useEffect(() => {
    if (checked) {
      getRecipesDrinksFilterByCategory(categoryDrink)
        .then(({ drinks }) => setListDrinkByCategory(drinks || []));
    }
  }, [categoryDrink]);

  const toggle = () => { if (checked) setListDrinkByCategory([]); };

  const handleClick = ({ target }) => {
    setCategoryDrink(target.name);
    setChecked(!checked);
    toggle();
  };

  function categoryButtom() {
    const five = 5;
    return (
      drink.map(({ strCategory }, index) => (
        index < five && (
          <div className="category-btn">
            <button
              key={ strCategory }
              type="button"
              name={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ ({ target }) => handleClick({ target }) }
            >
              { strCategory }
            </button>
          </div>
        )
      ))
    );
  }

  function createRender(list) {
    return list.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
      index < twelve && (
        <RecipeCard
          key={ idDrink }
          image={ strDrinkThumb }
          name={ strDrink }
          recipeCArdId={ `${index}-recipe-card` }
          cardImageId={ `${index}-card-img` }
          cardNameId={ `${index}-card-name` }
        />
      )
    ));
  }

  function header() {
    return (
      <>
        <HeaderFoods hassearchbar>
          <h1 data-testid="page-title">Bebidas</h1>
        </HeaderFoods>
        <SearchBar>
          <button
            onClick={ () => { handleFetchDrinkClick(); } }
            data-testid="exec-search-btn"
            type="button"
          >
            Buscar
          </button>
        </SearchBar>
        {categoryButtom() }
        {listDrinkByCategory.length
          ? createRender(listDrinkByCategory)
          : (recipesData.drinks && (createRender(recipesData.drinks))) }
        <BottomMenu />
      </>
    );
  }

  if (recipesData.drinks) {
    const drinkId = recipesData.drinks.map(({ idDrink }) => idDrink);
    return recipesData.drinks.length === 1 ? (<Redirect to={ `/bebidas/${drinkId}` } />)
      : header();
  }

  return (
    header()
  );
}

export default Drinks;
