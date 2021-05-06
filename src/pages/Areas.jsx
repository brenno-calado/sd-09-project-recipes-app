import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchAreas, fetchByArea } from '../services/fetchAreas';
import { fetchMeals } from '../services/fetchRecipes';
import './Styles/Areas.css';
import '../components/Cards.css';
import '../components/Card.css';

function Areas() {
  const [areas, setAreas] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchAreas().then((data) => setAreas(data));
    fetchMeals().then((data) => setRecipes(data));
  }, []);

  const handleChange = ({ target: { value } }) => {
    fetchByArea(value).then((data) => setRecipes(data));
  };

  return (
    <div>
      <Header title="Explorar Origem" searchBtn />
      <main>
        <section>
          <select
            data-testid="explore-by-area-dropdown"
            onChange={ handleChange }
          >
            <option data-testid="All-option" value="All">
              All
            </option>
            {areas.map((area, index) => (
              <option data-testid={ `${area}-option` } key={ index } value={ area }>
                {area}
              </option>
            ))}
          </select>
        </section>
        <section className="Cards">
          {recipes
            .slice(0, 12)
            .map(({ strMeal, strMealThumb, idMeal }, index) => (
              <Link
                data-testid={ `${index}-recipe-card` }
                key={ index }
                to={ `/comidas/${idMeal}` }
              >
                <div className="Card">
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strMealThumb }
                    alt="Meal"
                  />
                  <p data-testid={ `${index}-card-name` } className="name">
                    {strMeal}
                  </p>
                </div>
              </Link>
            ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Areas;
