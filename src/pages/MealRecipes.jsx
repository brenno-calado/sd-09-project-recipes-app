import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../contextApi/context';

const MealRecipes = () => {
  const [mealRecipes, setMealRecipes] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState({ active: false, filter: '' });
  const { ingredient } = useParams();
  const { inputToSearch, setMeals, resultOfMeals } = useContext(Context);
  console.log(inputToSearch);

  setMeals();
  const getDefaultRecipes = () => {
    const url = () => {
      if (ingredient) return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
      return 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    };

    fetch(url())
      .then((response) => {
        response.json()
          .then((data) => {
            setMealRecipes(data.meals);
          });
      });
  };

  const getRecipesById = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`)
      .then((response) => {
        console.log(response);
        response.json()
          .then((data) => {
            setMealRecipes(data.meals);
          });
      });
  };

  const handleFilter = (value) => {
    const { active, filter } = activeFilter;

    if (active && filter === value) {
      getDefaultRecipes();
      setActiveFilter({
        active: false,
        filter: '',
      });
    } else {
      getRecipesById(value);
      setActiveFilter({
        active: true,
        filter: value,
      });
    }
  };

  useEffect(() => {
    const url = () => {
      if (ingredient) return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
      return 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    };

    fetch(url())
      .then((response) => {
        response.json()
          .then((data) => {
            console.log(data);
            setMealRecipes(data.meals);
          });
      });
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => {
        response.json()
          .then((data) => {
            setMealCategories(data.meals);
          });
      });
  }, [ingredient]);

  const maxIndexCategories = 4;

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ getDefaultRecipes }
      >
        All
      </button>
      { mealCategories.length > 0
        && mealCategories.map(({ strCategory }, index) => {
          if (index > maxIndexCategories) return;
          return (
            <button
              onClick={ () => handleFilter(strCategory) }
              data-testid={ `${strCategory}-category-filter` }
              type="button"
              key={ strCategory }
            >
              { strCategory }
            </button>
          );
        }) }
      <div>
        { resultOfMeals(mealRecipes) }
      </div>
      <Footer />
    </div>

  );
};

export default MealRecipes;
