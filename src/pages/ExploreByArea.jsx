import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  exploreByAreaThunk,
  getMealsByAreaThunk,
  allMealsThunk,
} from '../redux/actions/actionsExplore';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ExploreByArea = ({ getAreas, areas, getRecipe, recipes, mealsDispatcher }) => {
  const [selectOption, setSelectOption] = useState('');
  const [showList, setShowList] = useState(false);
  const magicNumber = 12;
  const fetchAreas = async () => {
    await getAreas();
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  useEffect(() => {
    if (selectOption !== 'Selecione a opção' && selectOption !== 'All') {
      getRecipe(selectOption);
      setShowList(true);
    }
    if (selectOption === 'All') {
      mealsDispatcher();
    }
  }, [selectOption]);

  const handleChange = ({ target: { value } }) => {
    setSelectOption(value);
  };

  const renderRecipeList = (recipes !== null) ? (
    recipes.slice(0, magicNumber).map((recipe, index) => (
      <Link to={ `/comidas/${recipe.idMeal}` } key={ `${recipe.idMeal}/${index}` }>
        <div key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
          <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
          <img
            src={ recipe.strMealThumb }
            alt="foto da receita"
            data-testid={ `${index}-card-img` }
          />
        </div>
      </Link>
    ))) : '';

  return (
    <div>
      <Header title="Explorar Origem" />
      <label
        htmlFor="explore-by-area-dropdown"
      >
        Escolha o local de origem:
        <select
          onChange={ handleChange }
          value={ selectOption }
          id="explore-by-area-dropdown"
          data-testid="explore-by-area-dropdown"
        >
          { areas.map((area) => (
            <option
              key={ area.strArea }
              value={ area.strArea }
              data-testid={ `${area.strArea}-option` }
            >
              { area.strArea }
            </option>
          ))}
        </select>
      </label>
      { showList && recipes !== null && renderRecipeList }
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  areas: state.exploreRecipeReducer.areas,
  recipes: state.exploreRecipeReducer.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  getAreas: () => dispatch(exploreByAreaThunk()),
  getRecipe: (area) => dispatch(getMealsByAreaThunk(area)),
  mealsDispatcher: () => dispatch(allMealsThunk()),
});

ExploreByArea.propTypes = {
  areas: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAreas: PropTypes.func.isRequired,
  getRecipe: PropTypes.func.isRequired,
  mealsDispatcher: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreByArea);
