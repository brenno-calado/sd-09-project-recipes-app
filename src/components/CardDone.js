import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Details.css';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

class CardDone extends React.Component {
  constructor(props) {
    super(props);

    this.copyCodeToClipboard = this.copyCodeToClipboard.bind(this);
    this.renderTags = this.renderTags.bind(this);

    this.state = {
      linkCopy: false,
    };
  }

  copyCodeToClipboard() {
    const { done } = this.props;
    this.setState({ linkCopy: true });
    copy(`http://localhost:3000/${done.type}s/${done.id}`);
  }

  renderTags() {
    const { done, index } = this.props;
    const result = done.tags.map((tag) => (
      <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
        {tag}
      </p>
    ));
    return result;
  }

  render() {
    const { done, index } = this.props;
    const { linkCopy } = this.state;

    return (
      <div>
        <div>
          <Link to={ `/${done.type}s/${done.id}` }>
            <img
              src={ done.image }
              alt={ done.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
        </div>
        <div>
          <div>
            <p
              data-testid={ `${index}-horizontal-top-text` }
              className="sub"
            >
              { done.type === 'bebida' ? done.alcoholicOrNot
                : `${done.area} - ${done.category}`}
            </p>
            <button
              className="btn"
              type="button"
              onClick={ () => this.copyCodeToClipboard() }
            >
              <img
                src={ shareIcon }
                alt="share"
                className="icoBtn"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            { linkCopy && <p>Link copiado!</p> }
          </div>
          <Link to={ `/${done.type}s/${done.id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{done.name}</h2>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {`Feita em: ${done.doneDate}`}
          </p>
          { done.type === 'comida' && this.renderTags() }
        </div>
      </div>
    );
  }
}

CardDone.propTypes = ({
  done: PropTypes.arrayOf(PropTypes.object),
}).isRequired;

export default CardDone;
