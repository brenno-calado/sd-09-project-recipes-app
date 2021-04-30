import React, { useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import RecipesContext from '../context/RecipesContext';
import ListRecipes from '../components/ListRecipes';

const FoodRecipes = () => {
  const pathName = useLocation().pathname.split('/');
  const { recipes } = useContext(RecipesContext);

  let id;
  if (recipes.length === 0) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
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

export default FoodRecipes;
