import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { savePath } from '../redux/actions';
import Header from '../components/Header';
import RecipeList from '../components/RecipeList';

function Cocktails({ pathnameDispatcher, location }) {
  useEffect(() => {
    const { pathname } = location;
    pathnameDispatcher(pathname);
  }, []);

  return (
    <div>
      <h1 data-testid="page-title">Cocktails</h1>
      <Header />
      <RecipeList />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  pathnameDispatcher: (pathname) => dispatch(savePath(pathname)),
});

Cocktails.propTypes = {
  pathnameDispatcher: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Cocktails);
