import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../CSS/ProgressoBebidas.css';

const CheckBoxProgress = ({ ingredient, index, setStepsFinished,
  stepsFinished, ingredientsStatus,
  setIngredientsStatus, inProgressRecipe, idRecipe }) => {
  const [strikeThrough, setStrikeThrough] = useState(false);
  const ing = `${ingredient.name} ${ingredient.measure === null
    ? '' : ingredient.measure}`;
  const checkStep = () => {
    if (!strikeThrough) {
      setStrikeThrough(!strikeThrough);
      setStepsFinished(stepsFinished + 1);
      inProgressRecipe({ ...ingredientsStatus, [ing]: true }, idRecipe);
      setIngredientsStatus({ ...ingredientsStatus, [ing]: true });
    }
    if (strikeThrough) {
      setStrikeThrough(!strikeThrough);
      setStepsFinished(stepsFinished - 1);
      inProgressRecipe({ ...ingredientsStatus, [ing]: false });
      setIngredientsStatus({ ...ingredientsStatus, [ing]: false });
    }
  };
  return (
    <label
      htmlFor={ index }
      key={ ingredient.name }
      className={ strikeThrough ? 'cross' : null }
    >
      {ing}
      <input
        id={ index }
        type="checkbox"
        data-testid={ `${index}-ingredient-step` }
        onClick={ checkStep }
      />
    </label>
  );
};

CheckBoxProgress.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    measure: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  stepsFinished: PropTypes.number.isRequired,
  setStepsFinished: PropTypes.func.isRequired,
  ingredientsStatus: PropTypes.shape({}).isRequired,
  setIngredientsStatus: PropTypes.func.isRequired,
  idRecipe: PropTypes.number.isRequired,
  inProgressRecipe: PropTypes.func.isRequired,
};

export default CheckBoxProgress;
