import React from 'react';
import { connect } from 'react-redux';
import { objectOf } from 'prop-types';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';

class Comidas extends React.Component {
  render() {
    const { recipes } = this.props;
    return (
      <div>
        <SearchBar />
        {recipes.meals && recipes.meals.map((meal) => (
          <RecipeCard key={ meal.idMeal } meal={ meal } />))}
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
