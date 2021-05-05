import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MyContext from '../../../context/context';
import fetchApi from '../../../services/index';

function CategoriesBtn() {
  const { mealCategories, drinksCategories,
    setSearchFilter } = useContext(MyContext);
  const MAX_NUMBER_OF_CARDS_5 = 5;
  const { pathname } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selected, setSelected] = useState(false);

  const setCategoryApiResult = async (category) => {
    console.log(category);
    let resultApi = '';
    if (pathname === '/comidas') {
      resultApi = await fetchApi.fetchMealByCategories(category);
      setSearchFilter(resultApi);
    } else if (pathname === '/bebidas') {
      resultApi = await fetchApi.fetchDrinkByCategories(category);
      setSearchFilter(resultApi);
    }
  };

  const handleClick = async ({ target }) => {
    setSelectedCategory(target.value);
    if (selectedCategory !== target.value) {
      setCategoryApiResult(target.value);
      setSelected(selected);
    } else {
      setSelected(!selected);
    }
  };

  return (
    <div className="categories-button">
      <button type="button" className="basic-btn">All</button>
      {
        pathname === '/comidas'
          ? mealCategories.slice(0, MAX_NUMBER_OF_CARDS_5).map((mealCategory, index) => (
            <button
              className="basic-btn"
              type="button"
              data-testid={ `${mealCategory.strCategory}-category-filter` }
              key={ index }
              value={ mealCategory.strCategory }
              onClick={ (e) => handleClick(e) }
            >
              { mealCategory.strCategory }
            </button>
          ))
          : drinksCategories.slice(0, MAX_NUMBER_OF_CARDS_5)
            .map((drinkCategory, index) => (
              <button
                className="basic-btn"
                type="button"
                data-testid={ `${drinkCategory.strCategory}-category-filter` }
                key={ index }
                value={ drinkCategory.strCategory }
                onClick={ (e) => handleClick(e) }
              >
                { drinkCategory.strCategory }
              </button>
            ))
      }
    </div>
  );
}

export default CategoriesBtn;
