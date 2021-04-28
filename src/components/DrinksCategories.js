import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import { fecthByCategory, fetchCategories } from '../services/api';

function DrinksCategories() {
  const { setSearchResult } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const maxArrayLength = 5;

  const getCategories = async () => {
    const result = await fetchCategories(false);
    setCategories(result.drinks);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleClick = async ({ target: { value } }) => {
    setSearchResult(await fecthByCategory(value, false));
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

export default DrinksCategories;
