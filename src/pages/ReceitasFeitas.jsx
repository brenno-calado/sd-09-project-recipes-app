import React from 'react';
// import '../styles/Header.css';
import '../css/pages/ReceitasFeitas.css';
import Header from '../components/Header';
import NavReceitasFeitas from '../components/NavReceitasFeitas';
import ContentDoneRecipes from '../components/ContentDoneRecipes';

function ReceitasFeitas() {
  const data = [
    {
      id: 52846,
      type: 'meals',
      area: 'Japanese',
      category: 'Chicken',
      alcoholicOrNot: '',
      name: 'Chicken & mushroom Hotpot',
      image: 'https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg',
      doneDate: '2016-08-18',
      tags: ['bun', 'baking'],
    },
    {
      id: 11007,
      type: 'drinks',
      area: '',
      category: 'Ordinary Drink',
      alcoholicOrNot: 'Alcoholic',
      name: 'Margarita',
      image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
      doneDate: '2015-08-14',
      tags: [],
    },
  ];
  const doneRecipes = data.map((recipes, index) => (
    <ContentDoneRecipes key={ recipes.id } recipes={ recipes } index={ index } />
  ));
  return (
    <div>
      <Header page="Receitas Feitas" hasSearchButton={ false } />
      <div className="done-recipes-container">
        <NavReceitasFeitas />
        { doneRecipes }
      </div>
    </div>
  );
}

export default ReceitasFeitas;
