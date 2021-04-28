import React from 'react';
import { objectOf } from 'prop-types';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';

class Bebidas extends React.Component {
  render() {
    const { recipes } = this.props;
    const searchIcon = true;
    return (
      <div>
        <Header title="Bebidas" searchIcon={ searchIcon } />
        <SearchBar />
        <div className="recipe-card-container">
          {recipes.meals && recipes.meals.map((meal) => (
            <RecipeCard key={ meal.idMeal } meal={ meal } />))}
        </div>
      </div>
    );
  }
}

Bebidas.propTypes = {
  recipes: objectOf,
}.isRequired;

export default Bebidas;
