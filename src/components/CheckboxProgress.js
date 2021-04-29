import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../CSS/ProgressoBebidas.css';

const CheckBoxProgress = ({ ingredient, index, setStepsFinished, stepsFinished }) => {
  const [strikeThrough, setStrikeThrough] = useState(false);
  const checkStep = () => {
    if (!strikeThrough) {
      setStrikeThrough(!strikeThrough);
      setStepsFinished(stepsFinished + 1);
    }
    if (strikeThrough) {
      setStrikeThrough(!strikeThrough);
      setStepsFinished(stepsFinished - 1);
    }
  };
  return (
    <label
      htmlFor={ index }
      key={ ingredient.name }
      className={ strikeThrough ? 'cross' : null }
    >
      {`${ingredient.name} ${ingredient.measure === null
        ? '' : ingredient.measure}`}
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
    name: PropTypes.string.isRequired,
    measure: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  stepsFinished: PropTypes.number.isRequired,
  setStepsFinished: PropTypes.func.isRequired,
};

export default CheckBoxProgress;
