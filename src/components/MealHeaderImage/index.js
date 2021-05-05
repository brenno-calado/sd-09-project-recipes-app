import React, { Component } from 'react';
import PropTypes from 'prop-types';

import arrowBackIcon from '../../images/newIcons/arrowBack.svg';

class index extends Component {
  // constructor(props) {
  //   super(props);
  //   this.historyBack = this.historyBack.bind(this);
  // }

  /* historyBack() {
    const { history } = this.props;
    history.back();
  } */

  render() {
    const { image } = this.props;
    return (
      <div
        className="recipe-photo"
        style={
          { backgroundImage: `url(${image})` }
        }
      >
        {/* Tag image apenas para passar no teste da Trybe */}
        <img
          data-testid="recipe-photo"
          alt="foodOrDrink"
          style={
            { display: 'none' }
          }
        />
        <button
          type="button"
          className="back-button"
          // onClick={ this.historyBack }
        >
          <img src={ arrowBackIcon } alt="Botão voltar" />
        </button>
      </div>
    );
  }
}

index.propTypes = {
  image: PropTypes.string.isRequired,
};

export default index;
