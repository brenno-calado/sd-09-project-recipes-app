import React, { useContext, useEffect, useState } from 'react';
import CardRecipeMeal from '../../Components/CardRecipeMeal.js/CardRecipeMeal';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { RecipeContext } from '../../Context';
import Footer from '../../Components/Footer/Footer';
import './MealsScreen.css';
import Header from '../../Components/Header/Header';
import ButtonCategory from '../../Components/ButtonCategory/ButtonCategory';

function MealsScreen() {
  const {
    recipies,
    setRecipies,
    setTypeRecipies,
    typeRecipies,
    displaySearchBar,
  } = useContext(RecipeContext);

  const [mealsCategory, setMealsCategory] = useState([]);
  const [filter, setFilter] = useState('');

  function initMealsScreen() {
    if (typeRecipies !== 'comidas') {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((resp) => resp.json())
        .then((result) => setRecipies(result.meals));
      setTypeRecipies('comidas');
    }
  }

  useEffect(() => {
    initMealsScreen();
  });

  useEffect(() => {
    if (mealsCategory.length === 0) {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then((resp) => resp.json())
        .then((result) => setMealsCategory(result.meals));
    }
  });

  function removeFilter() {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((resp) => resp.json())
      .then((result) => setRecipies(result.meals));
  }

  function filterByMealCategoty(name) {
    console.log(name);
    if (name === filter) {
      removeFilter();
      setFilter('');
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
        .then((response) => response.json())
        .then((result) => setRecipies(result.meals));
      setFilter(name);
    }
  }

  return (
    <div>
      <Header title="Comidas" />
      { (displaySearchBar) && <SearchBar page="comidas" />}
      <section className="button-category-meals-container">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ removeFilter }
        >
          All
        </button>
        { mealsCategory.map((category, index) => (index < '5')
        && <ButtonCategory
          title={ category.strCategory }
          onclick={ filterByMealCategoty }
          key={ index }
        />)}
      </section>
      <div className="list-meal-container">
        {(recipies.length >= 1 && typeRecipies === 'comidas') && recipies
          .map((recipe, index) => (index < '12')
          && <CardRecipeMeal
            recipe={ recipe }
            index={ index }
            key={ index }
          />)}
      </div>
      <Footer />
    </div>
  );
}

export default MealsScreen;
