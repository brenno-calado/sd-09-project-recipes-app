import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecipeList from '../components/RecipeList';
import { savePath } from '../redux/actions';

const ExploreByIngredients = ({ pathnameDispatcher, location }) => {
  useEffect(() => {
    const { pathname } = location;
    if (pathname.includes('/comidas')) {
      pathnameDispatcher('/comidas');
    }
    if (pathname.includes('/bebidas')) {
      pathnameDispatcher('/bebidas');
    }
  }, [location, pathnameDispatcher]);

  return (
    <div>
      Explorar Por Ingredientes
      <RecipeList />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  pathnameDispatcher: (pathname) => dispatch(savePath(pathname)),
});

ExploreByIngredients.propTypes = {
  pathnameDispatcher: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(ExploreByIngredients);
