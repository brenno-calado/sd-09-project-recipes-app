import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { savePath } from '../redux/actions';
import Header from '../components/Header';
import RecipeList from '../components/RecipeList';
import CategoryFilter from '../components/CategoryFilter';
import Footer from '../components/Footer';

function Meals({ pathnameDispatcher, location }) {
  useEffect(() => {
    const { pathname } = location;
    if (pathname === '/comidas') {
      pathnameDispatcher(pathname, 'comidas');
    }
    if (pathname === '/bebidas') {
      pathnameDispatcher(pathname, 'bebidas');
    }
  }, []);

  return (
    <div>
      <h1 data-testid="page-title">Comidas</h1>
      <Header />
      <CategoryFilter />
      <RecipeList />
      <Footer />
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
