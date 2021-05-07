import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ params }) => {
  const { alt = 'Imagem' } = params;
  return (
    <img { ...params } alt={ alt } />
  );
};

export default Image;

Image.propTypes = {
  params: PropTypes.shape({
    alt: PropTypes.string,
  }).isRequired,
};
