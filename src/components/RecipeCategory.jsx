import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { fetchCategory } from '../services/fetchAPI';

const FIRST_FIVE_CATEGORY = 5;

export default function RecipeCategory({ type }) {
  // const [selectedCategory, setSelectedCategory] = useState('all');
  const [typeCategoryPopulated, setTypeCategoryPopulated] = useState([]);

  useEffect(() => {
    fetchCategory(type).then((response) => setTypeCategoryPopulated(response));
  }, []);

  // function setType(type) {
  //   const typeCategory = type === 'meals'
  //     ? apiReturnCategory.length && apiReturnCategory[0]
  //     : apiReturnCategory.length && apiReturnCategory[1];
  //   const endpoint = type === 'meals' ? 'themealdb' : 'thecocktaildb';
  //   const typeCategoryPopulated = typeCategory[type];

  //   async function toggleFunc([serviceEndpoint, category], categoryValue) {
  //     await onClickCategoryFetch(serviceEndpoint, category);
  //     if (categoryValue !== 'all') {
  //       setSelectedCategory(categoryValue);
  //       if (selectedCategory === categoryValue) setToggle(false);
  //       else setToggle(true);
  //     } else setToggle(false);
  //   }

  //   return (
  //     <div>
  //       {typeCategoryPopulated
  //         && typeCategoryPopulated.length
  //         && typeCategoryPopulated
  //           .slice(0, FIRST_FIVE_CATEGORY)
  //           .map((category) => (
  //             <button
  //               type="button"
  //               key={ `${category.strCategory}` }
  //               value={ `${category.strCategory}` }
  //               data-testid={ `${category.strCategory}-category-filter` }
  //               onClick={ (e) => toggleFunc([endpoint, category.strCategory], e.target.value) }
  //             >
  //               {category.strCategory}
  //             </button>
  //           ))}
  //       <button
  //         type="button"
  //         onClick={ () => setToggle(false) }
  //         data-testid="All-category-filter"
  //       >
  //         All
  //       </button>
  //     </div>
  //   );
  // }

  //   function renderCategory() {
  //     return <section>{setType(recipeType)}</section>;
  //   }
  //   return isFetching ? <p>Loading...</p> : renderCategory();

  return (
    <div>
      {typeCategoryPopulated[type]
      && typeCategoryPopulated[type].length
      && typeCategoryPopulated[type]
        .slice(0, FIRST_FIVE_CATEGORY)
        .map((category) => (
          <button
            type="button"
            key={ `${category.strCategory}` }
            value={ `${category.strCategory}` }
            data-testid={ `${category.strCategory}-category-filter` }
            // onClick={ (e) => toggleFunc([endpoint, category.strCategory], e.target.value) }
          >
            {category.strCategory}
          </button>
        ))}
      {/* <button
        type="button"
        onClick={ () => setToggle(false) }
        data-testid="All-category-filter"
      >
        All
      </button> */}
    </div>
  );
}

RecipeCategory.propTypes = {
  type: PropTypes.string.isRequired,
};
