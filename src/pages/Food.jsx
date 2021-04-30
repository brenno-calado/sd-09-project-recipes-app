import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import { fetchAllMeals, fetchCategoryMeals, fetchMealsByCategory,
} from '../service/mealAPI';
import useResult from '../effects/useResult';
import useCategory from '../effects/useCategory';
import CategoryButton from '../components/CategoryButton';
import Footer from '../components/Footer';

function Food({ match: { path } }) {
  const [result, setResult] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filter, setFilter] = useState([]);
  const maxResult = 12;

  useCategory(fetchCategoryMeals, setCategories);
  useResult(fetchAllMeals, setResult);

  const toggleCategory = async (strCategory, id) => {
    if (!selectedCategory || selectedCategory !== id) {
      const toFilter = await fetchMealsByCategory(strCategory);
      setSelectedCategory(id);
      return setFilter(toFilter);
    }
    setSelectedCategory('');
    return setFilter([]);
  };

  const renderCategories = () => {
    if (categories.length === 0) return;
    const maxCategories = 5;
    return categories.meals.slice(0, maxCategories)
      .map(({ strCategory }) => (
        <CategoryButton
          key={ strCategory }
          strCategory={ strCategory }
          toggleCategory={ toggleCategory }
        />));
  };

  const renderRecipeCards = (data) => data.meals.slice(0, maxResult)
    .map((meal, index) => (
      <RecipeCard
        index={ index }
        key={ meal.idMeal }
        name={ meal.strMeal }
        image={ meal.strMealThumb }
        path={ path }
        id={ meal.idMeal }
      />
    ));

  const renderFilter = () => {
    if (filter.meals === undefined) return 'loading...';
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
      <section className="categories-container">
        { renderCategories() }
        <button
          type="button"
          onClick={ () => {
            setSelectedCategory('');
            return setFilter([]);
          } }
          data-testid="All-category-filter"
        >
          All
        </button>
      </section>
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
