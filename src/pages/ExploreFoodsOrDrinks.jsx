import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { recipeSurpriseThunk } from '../redux/actions/index';

const ExploreFoodsOrDrinks = ({ history, dispatchSurpriseRecipe, surpriseRecipe }) => {
  const { location: { pathname }} = history;

  const fetchRandom = async (type) => {
    await dispatchSurpriseRecipe(type);
  };

  useEffect(() => {
    console.log(pathname);
    if (pathname.includes('comidas')) {
      fetchRandom('comidas');
    }
    if (pathname.includes('bebidas')) {
      fetchRandom('bebidas');
    }
  }, []);

  const renderButon = (recipeType) => {
    if (recipeType === 'comidas' && surpriseRecipe.length !== 0) {
      const { idMeal } = surpriseRecipe[0];
      return (
        <div>
          <Link to="/explorar/comidas/ingredientes">
            <button
              type="button"
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </Link>
          <Link to="/explorar/comidas/area">
            <button
              type="button"
              data-testid="explore-by-area"
            >
              Por Local de Origem
            </button>
          </Link>
          <Link to={ `/comidas/${idMeal}` }>
            <button
              type="button"
              testid="explore-surprise"
            >
              Me Surpreenda!
            </button>
          </Link>
        </div>
      );
    }
    if (recipeType === 'bebidas' && surpriseRecipe.length !== 0) {
      const { idDrink } = surpriseRecipe[0];
      return (
        <div>
          <Link to="/explorar/bebidas/ingredientes">
            <button
              type="button"
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </Link>
          <Link to={ `/bebidas/${idDrink}` }>
            <button
              type="button"
              testid="explore-surprise"
            >
              Me Surpreenda!
            </button>
          </Link>
        </div>
      );
    }
  };

  const renderContent = () => {
    if (pathname.includes('comidas')) {
      return (
        <div>
          Explorar Comidas!
          { renderButon('comidas') }
        </div>
      );
    }
    if (pathname.includes('bebidas')) {
      return (
        <div>
          Explorar Bebidas!
          { renderButon('bebidas') }
        </div>
      );
    }
  };
  console.log('render');
  return (
    <div>{ renderContent() }</div>
  );
};

const mapStateToProps = (state) => ({
  surpriseRecipe: state.recipeDetailsReducer.randomRecommended,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSurpriseRecipe: (path) => dispatch(recipeSurpriseThunk(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFoodsOrDrinks);
