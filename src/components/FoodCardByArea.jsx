import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ExploreFoodsButton from './ExploreFoodsButton';

export default function FoodCardByArea({ list }) {
  const ZERO = 0;
  const TWELVE = 12;
  const history = useHistory();
  const details = (idMeal) => {
    history.push(`/comidas/${idMeal}`);
  };

  return (
    <div>
      {list.slice(ZERO, TWELVE).map((e, i) => (
        <div key={ e.idMeal }>
          <div
            data-testid={ `${i}-card-name` }
          >
            <img
              data-testid={ `${i}-card-img` }
              src={ e.strMealThumb }
              alt="meail"
            />
            <h1>
              <ExploreFoodsButton
                testId={ `${i}-recipe-card` }
                details={ details }
                item={ e.strMeal }
                idMeal={ e.idMeal }
              />
            </h1>
          </div>
        </div>))}
    </div>
  );
}

FoodCardByArea.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};
