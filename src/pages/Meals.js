import React from 'react';
import { connect } from 'react-redux';
import { objectOf, string } from 'prop-types';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';

class Comidas extends React.Component {
  render() {
    const { recipes } = this.props;
    const searchIcon = true;
    return (
      <div>
        <SearchBar />
        {recipes.meals && recipes.meals.map((meal) => (
          <RecipeCard key={ meal.idMeal } meal={ meal } />))}
        <Header title="Comidas" searchIcon={ searchIcon } />
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
