import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clearRecipes, firstFetch } from '../redux/actions/recipes';
import fetchCategories from '../redux/actions/category';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import getPageTitle from '../services/pageTitles';
import Card from '../components/Card';

const noRecipeMsg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

const renderRecipes = (recipes) => recipes
  .map((recipe, index) => <Card key={ index } recipe={ recipe } index={ index } />);

const renderCategories = (categories) => {
  const fiveFilters = 5;
  const shownCategories = categories.slice(0, fiveFilters);
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
      />
    </label>
  ));
};

const Main = ({ match: { path } }) => {
  // const [filter, setFilter] = useState('');
  const { isFetching, recipes } = useSelector((state) => state.recipes);
  const { categories } = useSelector((state) => state.category);
  const maxRecipesShown = 12;
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const foods = location.pathname.includes('/comidas');

  let shownRecipes = [];

  useEffect(() => {
    dispatch(firstFetch(foods));
    dispatch(fetchCategories(foods));
  }, []);

  if (recipes) {
    shownRecipes = recipes.slice(0, maxRecipesShown);
    const { pathname } = location;
    const isSingleRecipe = recipes.length === 1;
    if (isSingleRecipe) {
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
