import React from 'react';
import { connect } from 'react-redux';
import { objectOf, string } from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';
import RecipeMealCard from '../components/RecipeMealCard';
import { defaultFetchApiAction, setIsLoading } from '../actions';

class Meals extends React.Component {
  componentDidMount() {
    const { defaultFetchApi, setIsLoadingToTrue } = this.props;
    setIsLoadingToTrue();
    defaultFetchApi();
  }

  render() {
    const { recipes, isLoading } = this.props;
    const searchIcon = true;
    const pathName = window.location.pathname;
    const mxmItens = 12;
    const itens = recipes && recipes.filter((_, index) => index < mxmItens);
    const idType = (pathName === '/comidas') ? 'idMeal' : 'idDrink';
    if (isLoading === true) return <p>Loading...</p>;
    if (recipes === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    return (
      <div>
        <Header title="Comidas" searchIcon={ searchIcon } />
        <div className="recipe-card-container">
          {recipes.meals && recipes.meals.map((meal) => (
            <RecipeMealCard key={ meal.idMeal } meal={ meal } />))}
        </div>
        {itens && itens.length === 1
          && <Redirect to={ `${pathName}/${itens[0][idType]}` } /> }
        {itens && itens.map((meal, index) => (
          <RecipeMealCard key={ meal[idType] } meal={ meal } index={ index } />))}
        <FooterMenu />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recipes: state.searchInputReducer.recipes,
  isLoading: state.searchInputReducer.isLoading,
});

const mapDispatchToProps = (dispach) => ({
  defaultFetchApi: () => dispach(defaultFetchApiAction()),
  setIsLoadingToTrue: () => dispach(setIsLoading()),
});

Meals.propTypes = {
  recipes: objectOf,
  searchIcon: string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Meals);
