import React, { useEffect } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import { searchBarFetch } from '../actions/searchBar';

function DrinkMainPage({ match, setRecipes }) {
  useEffect(() => {
    setRecipes({ searchValue: '', query: 's', page: 'Bebidas' });
  }, [setRecipes]);
  return (
    <div>
      <Header page="Bebidas" search />
      <RecipesList path={ match.path } />
      <Footer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setRecipes: (search) => dispatch(searchBarFetch(search)),
});

DrinkMainPage.propTypes = {
  match: object,
}.isRequired;

export default connect(null, mapDispatchToProps)(DrinkMainPage);
