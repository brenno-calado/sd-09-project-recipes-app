import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { savePath } from '../redux/actions';
import Header from '../components/Header';
import RecipeList from '../components/RecipeList';
import CategoryFilter from '../components/CategoryFilter';
import Footer from '../components/Footer';
import { fromExplore } from '../redux/actions/actionsExplore';

function Meals({
  pathnameDispatcher, location, isFetching, cameFromExplore, fromExploreDispatcher,
}) {
  const { pathname } = location;
  useEffect(() => {
    if (!cameFromExplore) {
      if (pathname === '/comidas') {
        pathnameDispatcher(pathname, 'comidas');
      }
      if (pathname === '/bebidas') {
        pathnameDispatcher(pathname, 'bebidas');
      }
    }
    fromExploreDispatcher(false);
  }, [pathname]);

  if (isFetching) return <p>Loading...</p>;
  return (
    <div>
      <h1 data-testid="page-title">
        { pathname === '/comidas' ? 'Comidas' : 'Bebidas' }
      </h1>
      <Header />
      <CategoryFilter />
      <RecipeList />
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isFetching: state.recipesReducer.isFetching,
  cameFromExplore: state.exploreRecipeReducer.cameFromExplore,
});

const mapDispatchToProps = (dispatch) => ({
  pathnameDispatcher: (pathname, recipeType) => dispatch(savePath(pathname, recipeType)),
  fromExploreDispatcher: (bool) => dispatch(fromExplore(bool)),
});

Meals.propTypes = {
  pathnameDispatcher: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  cameFromExplore: PropTypes.bool.isRequired,
  fromExploreDispatcher: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Meals);
