import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import { fecthByCategory, fetchCategories } from '../services/api';

function MealsCategories() {
  const { setSearchResult } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const maxArrayLength = 5;

  const getCategories = async () => {
    const result = await fetchCategories(true);
    setCategories(result.meals);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleClick = async ({ target: { value } }) => {
    setSearchResult(await fecthByCategory(value, true));
  };

  const createButton = (name) => (
    <button
      data-testid={ `${name}-category-filter` }
      key={ name }
      type="button"
      value={ name }
      onClick={ handleClick }
    >
      { name }
    </button>
  );

  return (
    <section>
      <button type="button" value="" onClick={ handleClick }>All</button>
      { !categories.length ? null
        : categories.map(({ strCategory }, index) => (
          index < maxArrayLength ? createButton(strCategory) : false
        ))}
    </section>
  );
}

export default MealsCategories;
