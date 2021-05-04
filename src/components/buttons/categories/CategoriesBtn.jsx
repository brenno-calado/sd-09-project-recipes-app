import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import MyContext from '../../../context/context';

function CategoriesBtn() {
  const { mealCategories, drinksCategories } = useContext(MyContext);
  const MAX_NUMBER_OF_CARDS_5 = 5;
  const { pathname } = useLocation();

  // const handleCategory = async () => {
  //   const result = '';
  //   if (pathname === '/comidas') {
  //     result = await fetchMealCategories
  //   } else if () {

  //   }
  // };

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
              >
                { drinkCategory.strCategory }
              </button>
            ))
      }
    </div>
  );
}

export default CategoriesBtn;
