import React, { useContext, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import RecipesContext from '../context/RecipesContext';
import ListRecipes from '../components/ListRecipes';

const DrinksFoodsRecipes = () => {
  const pathName = useLocation().pathname.split('/');
  const { recipes, searchBar, addSearchBar } = useContext(RecipesContext);
  const { text, radio, seachClicked } = searchBar;

  useEffect(() => {
    if (recipes.length === 0 && seachClicked) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      addSearchBar(text, radio, false);
    }
  }, [recipes]);

  let id;

  if (recipes.length === 1) {
    if (pathName[1] === 'comidas') {
      id = recipes[0].idMeal;
    } else {
      id = recipes[0].idDrink;
    }
  }

  return (
    <div>
      <Header />
      { recipes.length === 1 && (<Redirect to={ `/${pathName[1]}/${id}` } />) }
      { recipes.length > 0 && (<ListRecipes />) }
      <MenuInferior />
    </div>
  );
};

export default DrinksFoodsRecipes;
