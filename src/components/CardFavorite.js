import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Details.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { favoriteRecipesAction } from '../action/ButtonAction';

const copy = require('clipboard-copy');

class CardFavorite extends React.Component {
  constructor(props) {
    super(props);

    this.copyCodeToClipboard = this.copyCodeToClipboard.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);

    this.state = {
      linkCopy: false,
    };
  }

  copyCodeToClipboard() {
    const { favorite } = this.props;
    copy(`http://localhost:3000/${favorite.type}s/${favorite.id}`);
    this.setState({ linkCopy: true });
  }

  removeFavorite() {
    const { favorite, setFavorite, getFavoriteRecipes, handleFilter } = this.props;
    const favoriteFilter = getFavoriteRecipes
      .filter((favoriteF) => favoriteF.id !== favorite.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteFilter));
    setFavorite(favoriteFilter);
    handleFilter(favoriteFilter);
  }

  render() {
    const { favorite, index } = this.props;
    const { linkCopy } = this.state;

    return (
      <div>
        <div>
          <Link to={ `/${favorite.type}s/${favorite.id}` }>
            <img
              src={ favorite.image }
              alt={ favorite.name }
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
              { favorite.type === 'bebida' ? favorite.alcoholicOrNot
                : `${favorite.area} - ${favorite.category}`}
            </p>
            <Link to={ `/${favorite.type}s/${favorite.id}` }>
              <h2 data-testid={ `${index}-horizontal-name` }>{favorite.name}</h2>
            </Link>
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
            <button
              className="btn"
              type="button"
              onClick={ () => this.removeFavorite() }
            >
              <img
                src={ blackHeartIcon }
                alt="favorit"
                data-testid={ `${index}-horizontal-favorite-btn` }
                className="icoBtn"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getFavoriteRecipes: state.ButtonReducer.favoriteRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  setFavorite: (favorite) => dispatch(favoriteRecipesAction(favorite)),
});

CardFavorite.propTypes = ({
  getFavoriteRecipes: PropTypes.arrayOf(PropTypes.object),
  setFavorite: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(CardFavorite);
