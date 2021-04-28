import React from 'react';
import { connect } from 'react-redux';
import { objectOf, string } from 'prop-types';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';

class Comidas extends React.Component {
  render() {
    const { recipes } = this.props;
    const searchIcon = true;
    return (
      <div>
        <Header title="Comidas" searchIcon={ searchIcon } />
        <div className="recipe-card-container">
          {recipes.meals && recipes.meals.map((meal) => (
            <RecipeCard key={ meal.idMeal } meal={ meal } />))}
        </div>
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
