import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

class index extends Component {
  constructor() {
    super();
    this.state = {
      shareClicked: false,
    };
  }

  copyCurrentLink = () => {
    const { shareClicked } = this.state;
    const url = window.location.href;

    //  https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    navigator.clipboard.writeText(url)

    const actualShareState = shareClicked
    this.setState({
      shareClicked: !actualShareState,
    });
  }

  render() {
    const { title, category } = this.props;
    const { shareClicked } = this.state;
    return (
      <div className="recipe-details-box">
        <div className="recipe-details-informations">
          <h2 data-testid="recipe-title">{title}</h2>
          <p data-testid="recipe-category" className="recipe-category">{category}</p>
        </div>
        <div>
          <div onClick={ this.copyCurrentLink }>
            <img
              src={ shareIcon }
              alt="shareIcon"
              data-testid="share-btn"
            />
            {shareClicked ? <p>Link copiado!</p> : null}
          </div>
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
