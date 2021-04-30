import React from 'react';
import { Redirect } from 'react-router';
import { objectOf } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';
import RecipeDrinkCard from '../components/RecipeDrinkCard';
import { defaultFetchApiAction, setIsLoading } from '../actions';
import CategoriesList from '../components/CategoriesList';

class Drinks extends React.Component {
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
        <Header title="Bebidas" searchIcon={ searchIcon } />
        <CategoriesList />
        {itens && itens.length === 1
          && <Redirect to={ `${pathName}/${itens[0][idType]}` } /> }
        {itens && itens.map((drink, index) => (
          <RecipeDrinkCard key={ drink[idType] } drink={ drink } index={ index } />))}
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

Drinks.propTypes = {
  recipes: objectOf,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
