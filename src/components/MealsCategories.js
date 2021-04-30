import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context';
import { fecthByCategory, fetchCategoryList, fecthByName } from '../services/api';

function MealsCategories() {
  const { updateData } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [toggleClick, setToggleClick] = useState({});
  const maxArrayLength = 5;

  const getCategories = async () => {
    const result = await fetchCategoryList(true);
    setCategories(result.meals);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleClick = ({ target: { value, name } }) => {
    if (toggleClick[name] || name === 'All') {
      updateData(fecthByName('', true));
    } else { updateData(fecthByCategory(value, true)); }
    setToggleClick({ [name]: !toggleClick[name] });
  };

  const createButton = (name) => (
    <button
      data-testid={ `${name}-category-filter` }
      key={ name }
      type="button"
      value={ name }
      name={ name }
      onClick={ handleClick }
    >
      { name }
    </button>
  );

  if (!categories.length) return <div>Loading...</div>;

  return (
    <section>
      <button
        data-testid="All-category-filter"
        type="button"
        value=""
        name="All"
        onClick={ handleClick }
      >
        All
      </button>
      { categories.map(({ strCategory }, index) => (
        index < maxArrayLength ? createButton(strCategory) : false)) }
    </section>
  );
}

export default MealsCategories;
