import React from 'react';
import '../styles/recomendation.css';
import PropTypes from 'prop-types';

function Recomendations({ data }) {
  const title = data[0].strMeal !== undefined ? 'strMeal' : 'strDrink';
  return (
    <div>
      <ul>
        { data.map((r, index) => {
          if (index < 2) {
            return (
              <li data-testid={ `${index}-recomendation-card` }>
                <span data-testid={ `${index}-recomendation-title` }>{ r[title] }</span>
              </li>);
          }
          return (
            <li
              key={ r[title] }
              className="hidden"
              data-testid={ `${index}-recomendation-card` }
            >
              <span data-testid={ `${index}-recomendation-title` }>{ r[title] }</span>
            </li>);
        }) }
      </ul>
    </div>
  );
}

Recomendations.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Recomendations;
