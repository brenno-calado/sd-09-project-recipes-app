import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../context';
import { fecthByCategory, fetchCategoryList, fecthByName } from '../services/api';
import '../css/Categories.css';

function Categories() {
  const { updateData } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [toggleClick, setToggleClick] = useState({});
  const [focus, setFocus] = useState(true);
  const { pathname } = useLocation();
  const maxArrayLength = 5;

  const isMeals = pathname === '/comidas';
  const page = isMeals ? 'meals' : 'drinks';

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategoryList(isMeals);
      setCategories(data[page]);
    };
    getCategories();
  }, [isMeals, page]);

  const handleClick = ({ target: { value, name } }) => {
    if (toggleClick[name] || name === 'All') {
      updateData(fecthByName('', isMeals));
    } else { updateData(fecthByCategory(value, isMeals)); }
    setToggleClick({ [name]: !toggleClick[name] });
    setFocus(false);
  };

  const createButton = (name) => (
    <button
      data-testid={ `${name}-category-filter` }
      key={ name }
      type="button"
      value={ name }
      name={ name }
      onClick={ handleClick }
      className="button"
    >
      { name }
    </button>
  );

  if (!categories.length) return <div>Loading...</div>;

  return (
    <section className="wrapper-categories">
      <p>Filtros</p>
      <div className="buttons-container">
        <button
          data-testid="All-category-filter"
          type="button"
          value=""
          name="All"
          onClick={ handleClick }
          className={ `button ${focus ? 'focused' : null}` }
        >
          All
        </button>
        { categories.map(({ strCategory }, index) => (
          index < maxArrayLength ? createButton(strCategory) : false)) }
        <div className="square" />
      </div>
    </section>
  );
}

export default Categories;
