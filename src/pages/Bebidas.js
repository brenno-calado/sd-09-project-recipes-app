import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getDrinksFromCategory } from '../services';
import '../CSS/ComidasBebidas.css';

const MAX_AMOUNT = 12;
const CATEGORIES_NUMBER = 5;

function Bebidas() {
  const { drinks, drinkCategories, setDrinksApiResults } = useContext(AppContext);
  const [clicked, setClicked] = useState({});

  if (!drinks) return <p>Carregando...</p>;

  const handleClick = async (category) => {
    const response = await getDrinksFromCategory(category);
    if (!clicked[category]) {
      setClicked({
        [category]: true,
      });
      return setDrinksApiResults(response);
    }
    setClicked({
      [category]: false,
    });
    return setDrinksApiResults([]);
  };

  return (
    <>
      <Header title="Bebidas" searchIcon />
      <div className="buttons">
        <button
          className="category-filter-tags"
          data-testid="All-category-filter"
          type="button"
          onClick={ () => { setDrinksApiResults([]); setClicked({}); } }
        >
          All
        </button>
        { drinkCategories
          && drinkCategories.slice(0, CATEGORIES_NUMBER).map(({ strCategory }) => (
            <button
              className="category-filter-tags"
              data-testid={ `${strCategory}-category-filter` }
              key={ strCategory }
              type="button"
              onClick={ () => handleClick(strCategory) }
            >
              {strCategory}
            </button>
          )) }
      </div>
      <div className="listCard">
        { drinks && drinks.slice(0, MAX_AMOUNT).map((drink, index) => (
          <Link key={ drink.idDrink } to={ `/bebidas/${drink.idDrink}` }>
            <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                width="100px"
              />
              <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
            </div>
          </Link>
        )) }
      </div>
      <Footer />
    </>
  );
}

export default Bebidas;
