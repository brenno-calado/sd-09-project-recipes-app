import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../context';
import { fecthByCategory, fetchCategoryList, fecthByName } from '../services/api';

function Categories() {
  const { updateData } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [toggleClick, setToggleClick] = useState({});
  const { pathname } = useLocation();
  const maxArrayLength = 5;

  const isMeals = pathname === '/comidas';
  const page = isMeals ? 'meals' : 'drinks';

  const getCategories = async () => {
    const data = await fetchCategoryList(isMeals);
    setCategories(data[page]);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getCategories(); }, []);

  const handleClick = ({ target: { value, name } }) => {
    if (toggleClick[name] || name === 'All') {
      updateData(fecthByName('', isMeals));
    } else { updateData(fecthByCategory(value, isMeals)); }
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

export default Categories;
