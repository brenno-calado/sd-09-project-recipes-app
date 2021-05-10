import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecommendedCard = ({ recipe, index }) => {
  const history = useHistory();

  const handleClick = () => {
    if (recipe.idMeal) {
      return history.push(`/comidas/${recipe.idMeal}`);
    }
    return history.push(`/bebidas/${recipe.idDrink}`);
  };

  return (
    <div
      data-testid={ `${index}-recomendation-card` }
      key={ index }
    >
      <h5
        style={ { textAlign: 'center' } }
        data-testid={ `${index}-recomendation-title` }
      >
        {recipe.strMeal || recipe.strDrink}
      </h5>
      <button
        type="button"
        onClick={ () => handleClick() }

      >
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt="imagem-da-receita"
          width="100%"
          height="130px"
        />
      </button>
    </div>
  );
};

RecommendedCard.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecommendedCard;
