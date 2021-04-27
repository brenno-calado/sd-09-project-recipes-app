import React, { useEffect } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import { searchBarFetch } from '../actions/searchBar';

function FoodMainPage({ match, setRecipes }) {
  useEffect(() => {
    setRecipes({ searchValue: '', query: 's', page: 'Comidas' });
  }, [setRecipes]);
  return (
    <div>
      <Header page="Comidas" search />
      <RecipesList path={ match.path } />
      <Footer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setRecipes: (search) => dispatch(searchBarFetch(search)),
});

FoodMainPage.propTypes = {
  match: object,
}.isRequired;

export default connect(null, mapDispatchToProps)(FoodMainPage);
