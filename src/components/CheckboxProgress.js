import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../CSS/ProgressoBebidas.css';

const CheckBoxProgress = ({
  ingredient, index, setStepsFinished,
  stepsFinished,
  inProgressRecipe, idRecipe, ingStatus, setIngStatus,
}) => {
  const ing = `${ingredient.name} ${ingredient.measure === null
    ? '' : ingredient.measure}`;
  const [strikeThrough, setStrikeThrough] = useState(ingStatus[ing]);

  const checkStep = () => {
    if (!strikeThrough) {
      setStrikeThrough(!strikeThrough);
      setStepsFinished(stepsFinished + 1);
      inProgressRecipe({ ...ingStatus, [ing]: true }, idRecipe);
      setIngStatus({ ...ingStatus, [ing]: true });
    }
    if (strikeThrough) {
      setStrikeThrough(!strikeThrough);
      setStepsFinished(stepsFinished - 1);
      inProgressRecipe({ ...ingStatus, [ing]: false }, idRecipe);
      setIngStatus({ ...ingStatus, [ing]: false });
    }
  };

  return (
    <div data-testid={ `${index}-ingredient-step` }>
      <label
        htmlFor={ index }
        key={ ingredient.name }
        className={ strikeThrough ? 'cross' : null }
      >
        {ing}
        <input
          id={ index }
          type="checkbox"
          defaultChecked={ strikeThrough }
          onClick={ checkStep }
          value={ ing }
        />
      </label>
    </div>
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
  idRecipe: PropTypes.string.isRequired,
  inProgressRecipe: PropTypes.func.isRequired,
  ingStatus: PropTypes.shape({}).isRequired,
  setIngStatus: PropTypes.func.isRequired,
};

export default CheckBoxProgress;
