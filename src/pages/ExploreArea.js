import React, { useState } from 'react';

import Menu from '../components/Menu';
import Header from '../components/Header';
import { getFoodAreasList, getFoodByArea, getFoodAll } from '../services/FoodAPI';
import RecipeAreaCard from '../components/RecipeAreaCard';

const ExploreArea = () => {
  const [countryList, setCountryList] = useState();
  const [recipeList, setRecipeList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const recipesTypeSufix = 'Meal';
  const urlType = 'comidas';
  const RECIPES_LIMIT = 12;

  const getCountryList = async () => {
    const areasList = await getFoodAreasList();
    setCountryList(areasList);
  };

  const getMealByArea = async (area) => {
    const list = await getFoodByArea(area);
    list.splice(RECIPES_LIMIT);
    setRecipeList(list);
    setIsLoading(false);
  };

  const getMealAll = async () => {
    const list = await getFoodAll();
    list.meals.splice(RECIPES_LIMIT);
    setRecipeList(list.meals);
    setIsLoading(false);
  };

  const handleCountrySelect = ({ target }) => {
    if (target.value !== 'All') {
      setIsLoading(true);
      getMealByArea(target.value);
      return;
    }
    return getMealAll();
  };

  const generateCountryListSelect = () => (
    <select
      className="form-select form-select-lg mb-3"
      data-testid="explore-by-area-dropdown"
      onChange={ (evt) => handleCountrySelect(evt) }
    >
      <option data-testid="All-option">All</option>
      { countryList && countryList.map(
        (country, index) => (
          <option
            key={ index }
            data-testid={ `${country.strArea}-option` }
          >
            {country.strArea}
          </option>),
      )}
    </select>
  );

  if (!countryList) { getCountryList(); }
  if (!recipeList) { getMealAll(); }
  return (
    isLoading ? (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
      : (
        <div>
          <Header title="Explorar Origem" />
          <br />
          {generateCountryListSelect()}
          <br />
          { recipeList.map((recipe, index) => (
            <RecipeAreaCard
              key={ recipe[`id${recipesTypeSufix}`] }
              recipeName={ recipe[`str${recipesTypeSufix}`] }
              recipeImage={ recipe[`str${recipesTypeSufix}Thumb`] }
              index={ index }
              type={ urlType }
              id={ recipe[`id${recipesTypeSufix}`] }
              location={ urlType }
            />
          ))}
          <Menu />
        </div>
      )
  );
};

export default ExploreArea;
