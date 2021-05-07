import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import DoneMealCard from '../components/DoneMealCard';
import DoneDrinkCard from '../components/DoneDrinkCard';
import '../CSS/ReceitasFeitasFavoritas.css';
import { AppContext } from '../context/AppContext';

function ReceitasFeitas() {
  const { doneRecipes } = useContext(AppContext);
  const [filterName, setFilterName] = useState('');

  const handleClick = ({ target }) => {
    const { value } = target;
    setFilterName(value);
  };

  const showFilteredMeal = () => (
    doneRecipes.filter((meal) => {
      switch (filterName) {
      case 'All':
        return doneRecipes;
      case 'Food':
        return meal.type === 'comida';
      case 'Drinks':
        return meal.type === 'bebida';
      default:
        return doneRecipes;
      }
    })
  );

  const arrRecipes = filterName ? showFilteredMeal() : doneRecipes;

  return (
    <div>
      <Header title="Receitas Feitas" searchIcon={ false } />
      <section className="done-recipes-buttons">
        <button
          value="All"
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          value="Food"
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          value="Drinks"
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>
      <section className="done-recipes-section">
        {
          arrRecipes.map((recipe, index) => (
            recipe.type === 'comida'
              ? (
                <DoneMealCard
                  key={ index }
                  recipe={ recipe }
                  index={ index }
                />
              )
              : (
                <DoneDrinkCard
                  key={ index }
                  recipe={ recipe }
                  index={ index }
                />
              )
          ))
        }
      </section>
    </div>

  );
}

export default ReceitasFeitas;
