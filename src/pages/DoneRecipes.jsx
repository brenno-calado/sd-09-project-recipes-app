import React, { useState } from 'react';
import Header from '../components/Header';
import HorizontalCard from '../components/HorizontalCard';

function DoneRecipes() {
  const doneRecipes = [
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

  const storedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const [shownRecipes, setShownRecipes] = useState(storedRecipes);

  const handleFilter = (filter) => {
    if (filter === undefined) return setShownRecipes(storedRecipes);
    return setShownRecipes(storedRecipes.filter((recipe) => recipe.type === filter));
  };

  return (
    <div className="center">
      <Header title=" Receitas Feitas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => handleFilter() }
        disabled={ !storedRecipes }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => handleFilter('comida') }
        disabled={ !storedRecipes }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilter('bebida') }
        disabled={ !storedRecipes }
      >
        Drinks
      </button>
      <div className="card-container">
        { !shownRecipes ? <h4>no done recipe stored</h4>
          : shownRecipes.map((doneRecipe, index) => (
            <HorizontalCard key={ index } index={ index } doneRecipe={ doneRecipe } />)) }
      </div>
    </div>

  );
}

export default DoneRecipes;
