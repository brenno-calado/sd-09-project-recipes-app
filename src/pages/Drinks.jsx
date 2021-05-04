import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import { fetchAllDrinks, fetchCategoryDrinks, fetchDrinksByCategory,
} from '../service/cocktailAPI';
import useResult from '../effects/useResult';
import useCategory from '../effects/useCategory';
import CategoryButton from '../components/CategoryButton';
import Footer from '../components/Footer';

function Drinks({ match: { path } }) {
  const [result, setResult] = useState({});
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filter, setFilter] = useState({});
  const maxResult = 12;

  useCategory(fetchCategoryDrinks, setCategories);
  useResult(fetchAllDrinks, setResult);

  const toggleCategory = async (strCategory, id) => {
    if (!selectedCategory || selectedCategory !== id) {
      const toFilter = await fetchDrinksByCategory(strCategory);
      setSelectedCategory(id);
      return setFilter(toFilter);
    }
    setSelectedCategory('');
    return setFilter({});
  };

  const renderCategories = () => {
    if (Object.keys(categories).length === 0) return;
    const maxCategories = 5;
    console.log(categories);
    return categories.drinks.slice(0, maxCategories)
      .map(({ strCategory }) => (
        <CategoryButton
          key={ strCategory }
          strCategory={ strCategory }
          toggleCategory={ toggleCategory }
        />));
  };

  const renderRecipeCards = (data) => data.drinks.slice(0, maxResult)
    .map((drink, index) => (
      <RecipeCard
        index={ index }
        key={ drink.idDrink }
        name={ drink.strDrink }
        image={ drink.strDrinkThumb }
        path={ path }
        id={ drink.idDrink }
      />
    ));

  const renderFilter = () => {
    console.log(filter.drinks);
    if (Object.keys(filter).length === undefined) return 'loading...';
    return renderRecipeCards(filter);
  };

  const renderResult = () => {
    if (Object.keys(result).length === 0) return '...loading';
    if (result.drinks === null) {
      return window
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (result.drinks.length === 1) {
      return <Redirect to={ `${path}/${result.drinks[0].idDrink}` } />;
    }

    return renderRecipeCards(result);
  };

  return (
    <div className="center">
      <Header title="Bebidas" path={ path } setResult={ setResult } />
      <section className="categories-container">
        { renderCategories() }
        <button
          type="button"
          onClick={ () => {
            setSelectedCategory('');
            return setFilter({});
          } }
          data-testid="All-category-filter"
        >
          All
        </button>
      </section>
      <section
        className="card-container"
      >
        { Object.keys(filter).length === 0 ? renderResult() : renderFilter() }
      </section>
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Drinks;
