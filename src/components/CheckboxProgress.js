import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../CSS/ProgressoBebidas.css';

const CheckBoxProgress = ({ ingredient, index, setStepsFinished,
  stepsFinished, ingredientsStatus,
  setIngredientsStatus, inProgressDrink, idRecipe }) => {
  const [strikeThrough, setStrikeThrough] = useState(false);
  const ing = `${ingredient.name}${ingredient.measure === null
    ? '' : ingredient.measure}`;
  // const infoProgress = { [idRecipe]: ingredientsStatus };

  // useEffect(() => {
  //   inProgressDrink({ ...infoProgress });
  // }, [infoProgress]);
  const checkStep = () => {
    if (!strikeThrough) {
      setStrikeThrough(!strikeThrough);
      setStepsFinished(stepsFinished + 1);
      setIngredientsStatus({ ...ingredientsStatus, [ing]: true });
      const infoProgress = { [idRecipe]: ingredientsStatus };
      inProgressDrink(infoProgress);
    }
    if (strikeThrough) {
      setStrikeThrough(!strikeThrough);
      setStepsFinished(stepsFinished - 1);
      setIngredientsStatus({ ...ingredientsStatus, [ing]: false });
      const infoProgress = { [idRecipe]: ingredientsStatus };
      inProgressDrink(infoProgress);
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
};

export default CheckBoxProgress;
