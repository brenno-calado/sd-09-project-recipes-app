import React from 'react';
import { connect } from 'react-redux';
import { objectOf, string } from 'prop-types';
import { Redirect } from 'react-router-dom';

import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';
import RecipeMealCard from '../components/RecipeMealCard';

class Meals extends React.Component {
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
        <div className="recipe-card-container">
          {recipes.meals && recipes.meals.map((meal) => (
            <RecipeMealCard key={ meal.idMeal } meal={ meal } />))}
        </div>
        {itens.length === 1
          && <Redirect to={ `${pathName}/${recipes[0][idType]}` } /> }
        {itens.map((meal, index) => (
          <RecipeMealCard key={ meal[idType] } meal={ meal } index={ index } />))}
        <FooterMenu />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recipes: state.searchInputReducer.recipes,
});

Meals.propTypes = {
  recipes: objectOf,
  searchIcon: string,
}.isRequired;

export default connect(mapStateToProps)(Meals);
