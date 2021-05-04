import React, { useState, useEffect } from 'react';

import '../css/pages/ReceitasFeitas.css';
import Header from '../components/Header';
import NavReceitasFeitas from '../components/NavReceitasFeitas';
import ContentDoneRecipes from '../components/ContentDoneRecipes';
import getDoneRecipes from '../services/getLocalStorageDoneRecipes';

function ReceitasFeitas() {
  const [meals, setMeals] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [drincks, setDrincks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setDoneRecipes(getDoneRecipes());
  }, []);

  console.log('xablau');

  const filtersRecipes = (keyword) => (
    doneRecipes.filter(({ type }) => type === keyword)
  );

  const handleClickButton = ({ target: { value } }) => {
    if (value === 'food') {
      setMeals(filtersRecipes('comida'));
      setFilter(value);
    } else if (value === 'drinks') {
      setDrincks(filtersRecipes('bebida'));
      setFilter(value);
    } else {
      setFilter(value);
    }
  };

  const currentFilter = () => {
    switch (filter) {
    case 'all':
      return doneRecipes.map((recipe, index) => (
        <ContentDoneRecipes key={ recipe.id } recipes={ recipe } recipeIndex={ index } />
      ));
    case 'food':
      return meals.map((recipe, index) => (
        <ContentDoneRecipes key={ recipe.id } recipes={ recipe } recipeIndex={ index } />
      ));
    case 'drinks':
      return drincks.map((recipe, index) => (
        <ContentDoneRecipes key={ recipe.id } recipes={ recipe } recipeIndex={ index } />
      ));
    default:
      return 'Recipes not found!';
    }
  };

  return (
    <div>
      <Header page="Receitas Feitas" hasSearchButton={ false } />
      <div className="done-recipes-container">
        <NavReceitasFeitas onclick={ handleClickButton } />
        {currentFilter()}
      </div>
    </div>
  );
}

export default ReceitasFeitas;
