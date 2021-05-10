import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { getMealByArea } from '../services';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../CSS/ExplorarComidasOrigem.css';

const MAX_MEALS = 12;

function ExplorarComidasArea() {
  const { mealAreas, foods } = useContext(AppContext);
  const [areaValue, setAreaValue] = useState('Selecione uma opção');
  const [areaMeals, setAreaMeals] = useState([]);

  const fetchMeals = async (area) => {
    const response = await getMealByArea(area);
    setAreaMeals(response);
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setAreaValue(value);
  };

  useEffect(() => {
    fetchMeals(areaValue);
  }, [areaValue]);

  const mealArray = areaMeals !== null ? areaMeals : foods;

  return (
    <>
      <Header title="Explorar Origem" searchIcon />
      <section className="select-section">
        <select
          data-testid="explore-by-area-dropdown"
          value={ areaValue }
          onChange={ handleChange }
          className="dropdown"
        >
          <option disabled>Selecione uma opção</option>
          <option data-testid="All-option" value="All">All</option>
          { mealAreas && mealAreas.map(({ strArea }) => (
            <option
              data-testid={ `${strArea}-option` }
              key={ strArea }
              value={ strArea }
            >
              {strArea}
            </option>
          )) }
        </select>
      </section>
      <section className="origin-section">
        <div className="card-list">
          { foods && mealArray.slice(0, MAX_MEALS).map((food, index) => (
            <Link key={ food.idMeal } to={ `/comidas/${food.idMeal}` }>
              <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ food.strMealThumb }
                  alt={ food.strMeal }
                  width="100px"
                />
                <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
              </div>
            </Link>
          )) }
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ExplorarComidasArea;
