import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import { getFoodsFromCategory } from '../services';

function Comidas() {
  const { foods, foodCategories, setFoodApiResults } = useContext(AppContext);
  const [clicked, setClicked] = useState({});
  if (!foods) return <p>Carregando...</p>;

  const handleClick = async (category) => {
    const response = await getFoodsFromCategory(category);
    if (!clicked[category]) {
      setClicked({
        [category]: true,
      });
      return setFoodApiResults(response);
    }
    setClicked({
      [category]: false,
    });
    return setFoodApiResults([]);
  };

  return (
    <>
      <Header title="Comidas" searchIcon />
      <button
        type="button"
        onClick={ () => setFoodApiResults([]) }
      >
        All
      </button>
      { foodCategories && foodCategories.map(({ strCategory }) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          key={ strCategory }
          type="button"
          onClick={ () => handleClick(strCategory) }
        >
          {strCategory}
        </button>
      )) }
      { foods && foods.map((food, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ food.idMeal }>
          <img
            data-testid={ `${index}-card-img` }
            src={ food.strMealThumb }
            alt={ food.strMeal }
            width="100px"
          />
          <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
        </div>
      )) }
      <Footer />
    </>
  );
}

export default Comidas;
