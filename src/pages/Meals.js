import React from 'react';
import { connect } from 'react-redux';
import { objectOf } from 'prop-types';
import { Redirect } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipeMealCard from '../components/RecipeMealCard';

class Comidas extends React.Component {
  render() {
    const { recipes } = this.props;
    const pathName = window.location.pathname;
    const idType = (pathName === '/comidas') ? 'idMeals' : 'idDrinks';
    return (
      <div>
        <SearchBar />
        {recipes.length === 1
          && <Redirect to={ `${pathName}/${recipes[0][idType]}` } /> }
        {recipes.map((meal, index) => (
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
}.isRequired;

export default connect(mapStateToProps)(Comidas);
