/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import { getMealsCatergories } from '../services/api';

function CategoryButtons(props) {
  const { categoryName, route } = props;
  const { setCategoryName, setRestartRecipes } = useContext(RecipesContext);
  const [categories, setCatergories] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const maxCategoriesToRender = 5;

  const getCategories = async () => {
    setCatergories(await getMealsCatergories(route));
    setIsLoading(false);
  };

  const handleClick = ({ value }) => {
    if (value !== categoryName) {
      setCategoryName(value);
    } else {
      setCategoryName('');
      setRestartRecipes(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getCategories();
  }, []);

  const handleAllButtonClick = () => {
    setRestartRecipes(true);
  };

  return isLoading === false
    ? (
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ handleAllButtonClick }
        >
          All
        </button>
        {categories.map(({ strCategory }, index) => (
          index < maxCategoriesToRender
            ? (
              <button
                type="button"
                key={ index }
                value={ strCategory }
                data-testid={ `${strCategory}-category-filter` }
                onClick={ (e) => handleClick(e.target) }
              >
                {strCategory}
              </button>
            )
            : null
        ))}
      </div>
    ) : null;
}

CategoryButtons.propTypes = {
  categoryName: PropTypes.string,
  route: PropTypes.string,
}.isRequired;

export default CategoryButtons;
