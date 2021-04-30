import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
  const { index, name, thumbnail } = props;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <p data-testid={ `${index}-card-name` }>{name}</p>
      <img
        src={ thumbnail }
        width="150px"
        alt="Imagem da receita"
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
};

Card.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default Card;
