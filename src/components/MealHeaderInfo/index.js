import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

class index extends Component {
  render() {
    const { title, category } = this.props;
    return (
      <div className="recipe-details-box">
        <div className="recipe-details-informations">
          <h2 data-testid="recipe-title">{title}</h2>
          <p data-testid="recipe-category" className="recipe-category">{category}</p>
        </div>
        <div>
          <img src={ shareIcon } alt="shareIcon" data-testid="share-btn" />
          <img src={ whiteHeartIcon } alt="whiteHeartIcon" data-testid="favorite-btn" />
        </div>
      </div>
    );
  }
}

index.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default index;
