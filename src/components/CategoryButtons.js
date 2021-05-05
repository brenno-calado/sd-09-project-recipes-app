import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { getMealsCatergories } from '../services/api';

function CategoryButtons(props) {
  const { categoryName, route } = props;
  const { setCategoryName } = useContext(RecipesContext);
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
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getCategories();
  }, []);

  return isLoading === false
    ? (
      categories.map(({ strCategory }, index) => (
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
      ))
    ) : null;
}

export default CategoryButtons;
