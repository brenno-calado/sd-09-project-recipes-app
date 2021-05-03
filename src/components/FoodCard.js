import '../styles/mainCard.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class FoodCard extends React.Component {
  render() {
    const { food, index, testid, nameId } = this.props;
    return (
      <Link to={ `/comidas/${food.idMeal}` } className="link">
        <div data-testid={ `${index}${testid}` } className="boxImg">
          <img
            src={ food.strMealThumb }
            alt={ food.strMeal }
            data-testid={ `${index}-card-img` }
            className="img w-100 h-50"
          />
          <p data-testid={ `${index}${nameId}` }>{food.strMeal}</p>
        </div>
      </Link>
    );
  }
}

FoodCard.propTypes = ({
  food: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number,
}).isRequired;

export default FoodCard;
