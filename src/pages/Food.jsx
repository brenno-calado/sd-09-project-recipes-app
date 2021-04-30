import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchAllMeals, fetchCategoryMeals } from '../service/mealAPI';
import useResult from '../effects/useResult';
import useCategory from '../effects/useCategory';
import CategoryButton from '../components/CategoryButton';

function Food({ match: { path } }) {
  const [result, setResult] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState([]);
  const maxResult = 12;

  useCategory(fetchCategoryMeals, setCategories);
  useResult(fetchAllMeals, setResult);

  const renderCategories = () => {
    if (categories.length === 0) return;
    const maxCategories = 5;
    return categories.meals.slice(0, maxCategories)
      .map(({ strCategory }) => (
        <CategoryButton
          key={ strCategory }
          strCategory={ strCategory }
          setFilter={ setFilter }
          path={ path }
        />));
  };

  const renderRecipeCards = (data) => data.meals.slice(0, maxResult)
    .map((meal, index) => (
      <RecipeCard
        index={ index }
        key={ meal.idMeal }
        name={ meal.strMeal }
        image={ meal.strMealThumb }
      />
    ));

  const renderFilter = () => {
    if (filter.meals === undefined) return 'loading...';
    console.log(filter.meals.slice(0, maxResult));
    return renderRecipeCards(filter);
  };

  const renderResult = () => {
    if (result.length === 0) return '...loading';
    if (result.meals === null) {
      return window
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (result.meals.length === 1) {
      return <Redirect to={ `${path}/${result.meals[0].idMeal}` } />;
    }

    return renderRecipeCards(result);
  };

  return (
    <div className="center">
      <Header title="Comidas" path={ path } setResult={ setResult } />
      <section className="categories-container">{ renderCategories() }</section>
      <section
        className="card-container"
      >
        { filter.length === 0 ? renderResult() : renderFilter() }
      </section>
      <Footer />
    </div>
  );
}

Food.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Food;
