import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMeals } from '../services/MealFetch';
import { getDrinks } from '../services/DrinkFetch';
import '../styles/recipes.css';

function Recomendations(props) {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { type } = props;

  const fetchFoodRecs = () => {
    getMeals().then((m) => setRecs(m)).then(() => setLoading(false));
  };

  const fetchDrinkRecs = () => {
    getDrinks().then((m) => setRecs(m)).then(() => setLoading(false));
  };

  useEffect(() => {
    if (type === 'comida') {
      fetchFoodRecs();
    }
    if (type === 'bebida') {
      fetchDrinkRecs();
    }
  }, []);

  if (loading) {
    return null;
  }

  if (type === 'bebida' || loading === false) {
    console.log('Drinks:', recs);
    return (
      <div className="rec-div">
        {recs.map((rec, index) => (
          <div
            key={ Math.random() }
            className="rec-card"
            data-testid={ `${index}-recomendation-card` }
          >
            <Link
              to={ `/bebidas/${rec.idDrink}` }
            >
              <img
                src={ rec.strDrinkThumb }
                alt={ `Imagem do drink ${rec.idDrink}` }
                data-testid={ `${index}-card-img` }
                style={ { width: '150px' } }
              />
            </Link>
            <h3>{ rec.strAlcoholic }</h3>
            <h4 data-testid={ `${index}-recomendation-title` }>{ rec.strDrink }</h4>
          </div>))}
      </div>
    );
  }

  if (type === 'comida' || loading === false) {
    // console.log('Foods:', recs);
    return (
      <div className="rec-div">
        {recs.map((rec, index) => (
          <div
            key={ Math.random() }
            className="rec-card"
            data-testid={ `${index}-recomendation-card` }
          >
            <Link
              to={ `/bebidas/${rec.idMeal}` }
            >
              <img
                src={ rec.strMealThumb }
                alt={ `Imagem do drink ${rec.idMeal}` }
                data-testid={ `${index}-card-img` }
                style={ { width: '150px' } }
              />
            </Link>
            <h4 data-testid={ `${index}-recomendation-title` }>{ rec.strMeal }</h4>
          </div>))}
      </div>
    );
  }
}

Recomendations.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Recomendations;
