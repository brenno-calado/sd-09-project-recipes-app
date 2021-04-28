import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { savePath } from '../redux/actions';
import Header from '../components/Header';
import RecipeList from '../components/RecipeList';
import CategoryFilter from '../components/CategoryFilter';

function Meals({ pathnameDispatcher, location }) {
  useEffect(() => {
    const { pathname } = location;
    if (pathname === '/comidas') {
      pathnameDispatcher(pathname, 'meals');
    }
    if (pathname === '/bebidas') {
      pathnameDispatcher(pathname, 'cocktails');
    }
  }, []);

  return (
    <div>
      <h1 data-testid="page-title">Comidas</h1>
      <Header />
      <CategoryFilter />
      <RecipeList />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  pathnameDispatcher: (pathname, recipeType) => dispatch(savePath(pathname, recipeType)),
});

Meals.propTypes = {
  pathnameDispatcher: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Meals);
