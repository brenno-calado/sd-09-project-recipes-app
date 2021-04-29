import React, { useContext, useEffect, useState } from 'react';
import ButtonCategory from '../../Components/ButtonCategory/ButtonCategory';
import CardRecipeDrink from '../../Components/CardRecipeDrink.js/CardRecipeDrink';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { RecipeContext } from '../../Context';
import './DrinksScreen.css';

function DrinksScreen() {
  const {
    recipies,
    setRecipies,
    typeRecipies,
    setTypeRecipies,
    displaySearchBar,
  } = useContext(RecipeContext);

  const [drinksCategory, setDrinksCategory] = useState([]);
  const [filter, setFilter] = useState('');

  function initDrinksScreen() {
    if (typeRecipies !== 'bebidas') {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((resp) => resp.json())
        .then((result) => setRecipies(result.drinks));
      setTypeRecipies('bebidas');
    }
  }

  useEffect(() => {
    initDrinksScreen();
  });

  useEffect(() => {
    if (drinksCategory.length === 0) {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then((resp) => resp.json())
        .then((result) => setDrinksCategory(result.drinks));
    }
  });

  function removeFilter() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((resp) => resp.json())
      .then((result) => setRecipies(result.drinks));
  }

  function filterByCategoty(name) {
    console.log(name);
    if (name === filter) {
      removeFilter();
      setFilter('');
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`)
        .then((response) => response.json())
        .then((result) => setRecipies(result.drinks));
      setFilter(name);
    }
  }

  return (
    <div>
      <Header title="Bebidas" />
      { (displaySearchBar) && <SearchBar page="bebidas" />}
      <section className="button-category-container">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ removeFilter }
        >
          All
        </button>
        { drinksCategory.map((category, index) => (index < '5')
        && <ButtonCategory
          title={ category.strCategory }
          onclick={ filterByCategoty }
          key={ index }
        />)}
      </section>
      <div className="list-drink-container">
        {(recipies.length > 1 && typeRecipies === 'bebidas') && recipies
          .map((recipe, index) => (index < '12')
          && <CardRecipeDrink
            recipe={ recipe }
            // data-testid={ `${index}-recipe-card` }
            index={ index }
            key={ index }
          />)}
      </div>
      <Footer />
    </div>
  );
}

export default DrinksScreen;
