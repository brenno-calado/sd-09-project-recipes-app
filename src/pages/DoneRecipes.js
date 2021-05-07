import React from 'react';
import DoneRecipesButtons from '../components/DoneRecipesButtons';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Header from '../components/Header';

function DoneRecipes() {
  return (
    <div>
      <Header title="Receitas Feitas" />
      <DoneRecipesButtons />
      <DoneRecipesCard index={ 0 } tagName="Pasta" />
      <DoneRecipesCard index={ 0 } tagName="Curry" />
    </div>
  );
}

export default DoneRecipes;
