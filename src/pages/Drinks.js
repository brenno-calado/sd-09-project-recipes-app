import React from 'react';
import { Redirect, Link } from 'react-router-dom';
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
    const { recipes, isLoading, isCategory } = this.props;
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
      <div className="hmf-wrapper">
        <div className="hmf-header">
          <Header title="Bebidas" searchIcon={ searchIcon } />
        </div>
        <div className="hmf-main">
          <CategoriesList />
          {itens && !isCategory && itens.length === 1
            && <Redirect to={ `${pathName}/${itens[0][idType]}` } /> }
          <div className="meals-wrap">
            {itens && itens.map((drink, index) => (
              <div key={ drink[idType] } className="meals-card">
                <Link to={ `${pathName}/${itens[index][idType]}` }>
                  <RecipeDrinkCard drink={ drink } index={ index } />
                </Link>
              </div>))}
          </div>
        </div>
        <div className="hmf-footer">
          <FooterMenu />
        </div>
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
