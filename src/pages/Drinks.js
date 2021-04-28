import React from 'react';
import { Redirect } from 'react-router';
import { objectOf } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import RecipeDrinkCard from '../components/RecipeDrinkCard';
import SearchBar from '../components/SearchBar';

class Drinks extends React.Component {
  render() {
    const searchIcon = true;
    const { recipes } = this.props;
    const pathName = window.location.pathname;
    const idType = (pathName === '/comidas') ? 'idMeals' : 'idDrink';
    return (
      <>
        <Header title="Bebidas" searchIcon={ searchIcon } />
        <SearchBar />
        {recipes.length === 1
          && <Redirect to={ `${pathName}/${recipes[0][idType]}` } /> }
        {recipes.map((drink, index) => (
          <RecipeDrinkCard key={ drink[idType] } drink={ drink } index={ index } />))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  recipes: state.searchInputReducer.recipes,
});

Drinks.propTypes = {
  recipes: objectOf,
}.isRequired;

export default connect(mapStateToProps)(Drinks);
