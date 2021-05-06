import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clearRecipes, firstFetch, fetchSearchRecipes } from '../redux/actions/recipes';
import setSearchOptions from '../redux/actions/search';
import fetchCategories from '../redux/actions/category';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import getPageTitle from '../services/pageTitles';
import Card from '../components/Card';

const Main = ({ match: { path } }) => {
  const { isFetching, recipes } = useSelector((state) => state.recipes);
  const { categories } = useSelector((state) => state.category);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const maxRecipesShown = 12;
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const foods = location.pathname.includes('/comidas');
  const noRecipeMsg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  let shownRecipes = [];

  const handleToggle = (value) => {
    if (categoryFilter === value) {
      setCategoryFilter('All');
      setIsCategorySelected(false);
    } else {
      setCategoryFilter(value);
      setIsCategorySelected(true);
    }
  };

  const renderRecipes = (recipesArray) => recipesArray
    .map((recipe, index) => (
      <button
        key={ index }
        type="button"
        onClick={ () => history
          .push(`${location.pathname}/${recipe.idDrink || recipe.idMeal}`) }
      >
        <Card
          recipe={ recipe }
          index={ index }
        />
      </button>
    ));

  const renderCategories = (categoriesArray) => {
    const fiveFilters = 5;
    const shownCategories = categoriesArray.slice(0, fiveFilters);
    return shownCategories.map(({ strCategory }, index) => (
      <label key={ index } htmlFor={ strCategory }>
        { strCategory }
        {' '}
        <input
          type="radio"
          id={ strCategory }
          name="category"
          data-testid={ `${strCategory}-category-filter` }
          value={ strCategory }
          onClick={ ({ target: { value } }) => handleToggle(value) }
          checked={ categoryFilter === strCategory }
        />
      </label>
    ));
  };

  useEffect(() => {
    dispatch(firstFetch(foods));
    dispatch(fetchCategories(foods));
  }, []);

  useEffect(() => {
    if (categoryFilter === 'All') {
      dispatch(firstFetch(foods));
    } else {
      const categorySearch = { c: categoryFilter, isFoodsPage: foods };
      dispatch(setSearchOptions(categorySearch));
      dispatch(fetchSearchRecipes());
    }
  }, [categoryFilter]);

  if (recipes) {
    shownRecipes = recipes.slice(0, maxRecipesShown);
    const { pathname } = location;
    const isSingleRecipe = recipes.length === 1;
    if (isSingleRecipe && !isCategorySelected) {
      const recipe = recipes[0];
      const recipeId = recipe.idDrink || recipe.idMeal;
      history.push(`${pathname}/${recipeId}`);
    }
  } else {
    dispatch(clearRecipes());
    alert(noRecipeMsg);
  }

  return (
    <>
      <Header activeSearch title={ getPageTitle(path) } />
      {renderCategories(categories)}
      <label htmlFor>
        All
        <input
          type="radio"
          name="category"
          value="All"
          data-testid="All-category-filter"
          onClick={ ({ target: { value } }) => setCategoryFilter(value) }
        />
      </label>
      {isFetching ? <Loading /> : renderRecipes(shownRecipes)}
      <Footer />
    </>
  );
};

export default Main;

Main.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
