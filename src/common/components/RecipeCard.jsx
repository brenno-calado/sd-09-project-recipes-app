import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '5rem',
    heigth: '4rem',
  },
  bonitinho: {
    flexDirection: 'column',
    display: 'flex',
    flexWrap: 'no-wrap',
    justifyContent: 'center',
  },
});

function RecipeCard(props) {
  const classes = useStyles();
  const [vouRedirecionar, devoRedirecionar] = useState(false);

  const { index, recipe } = props;

  const handleClick = () => (
    devoRedirecionar(true)
  );

  return (
    <button type="button" onClick={ handleClick }>
      <div
        data-testid={ `${index}-recipe-card` }
        className={ classes.bonitinho }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt="recipe-thumb"
          className={ classes.root }
        />
        <h4
          data-testid={ `${index}-card-name` }
        >
          {
            recipe.strMeal || recipe.strDrink
          }
        </h4>
      </div>
      {vouRedirecionar && <Redirect
        to={ `comidas/${recipe.idMeal || recipe.idDrink}` }
        recipe={ recipe }
      />}
    </button>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
};

export default RecipeCard;
