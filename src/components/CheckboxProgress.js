import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../CSS/ProgressoBebidas.css';

const CheckBoxProgress = ({
  ingredient, index, setStepsFinished,
  stepsFinished, ingredientsUsed,
  inProgressRecipe, idRecipe, type, ingStatus, setIngStatus,
}) => {
  const [strikeThrough, setStrikeThrough] = useState(false);
  const ing = `${ingredient.name} ${ingredient.measure === null
    ? '' : ingredient.measure}`;
  // setIngStatus({ ...ingStatus, [ing]: false });

  const checkStep = () => {
    if (!strikeThrough) {
      setStrikeThrough(!strikeThrough);
      setStepsFinished(stepsFinished + 1);
      inProgressRecipe({ ...ingStatus, [ing]: true }, idRecipe);
      ingredientsUsed(ing);
    }
    if (strikeThrough) {
      setStrikeThrough(!strikeThrough);
      setStepsFinished(stepsFinished - 1);
      // inProgressRecipe(type, idRecipe);
      inProgressRecipe({ ...ingStatus, [ing]: false }, idRecipe);
      ingredientsUsed(ing);
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
        value={ ing }
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
  ingredientsUsed: PropTypes.arrayOf(PropTypes.string).isRequired,
  idRecipe: PropTypes.number.isRequired,
  inProgressRecipe: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default CheckBoxProgress;
