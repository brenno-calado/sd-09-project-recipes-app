import React from 'react';
import { connect } from 'react-redux';
import { objectOf, string } from 'prop-types';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import { Redirect } from 'react-router-dom';
import RecipeMealCard from '../components/RecipeMealCard';

class Comidas extends React.Component {
  render() {
    const { recipes } = this.props;
    const searchIcon = true;
    const pathName = window.location.pathname;
    const mxmItens = 12;
    const itens = recipes.filter((_, index) => index < mxmItens);
    const idType = (pathName === '/comidas') ? 'idMeals' : 'idDrinks';
    return (
      <div>
        <Header title="Comidas" searchIcon={ searchIcon } />
        {itens.length === 1
          && <Redirect to={ `${pathName}/${recipes[0][idType]}` } /> }
        {itens.map((meal, index) => (
          <RecipeMealCard key={ meal[idType] } meal={ meal } index={ index } />))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recipes: state.searchInputReducer.recipes,
});

Comidas.propTypes = {
  recipes: objectOf,
  searchIcon: string,
}.isRequired;

export default connect(mapStateToProps)(Comidas);
