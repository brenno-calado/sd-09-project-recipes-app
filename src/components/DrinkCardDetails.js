import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { drinkDetailsThunk } from '../action/FoodAndDrinkDetailsAction';
import '../styles/Details.css';
import { favoriteRecipesAction } from '../action/ButtonAction';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

class DrinkCardDetails extends React.Component {
  constructor(props) {
    super(props);

    this.copyCodeToClipboard = this.copyCodeToClipboard.bind(this);
    this.heartToggle = this.heartToggle.bind(this);
    this.verificFavorite = this.verificFavorite.bind(this);

    this.state = {
      linkCopy: false,
      heartToggle: false,
    };
  }

  componentDidMount() {
    const { id, setDrinksDetails, setFavorite } = this.props;

    setDrinksDetails(id);
    const localFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorite(localFavorite);
    this.verificFavorite();
  }

  verificFavorite() {
    const { id } = this.props;
    const localFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localFavorite && localFavorite.find((favorite) => favorite.id === id)) {
      this.setState({ heartToggle: true });
    }
  }

  copyCodeToClipboard() {
    copy(window.location.href.replace(/\/in-progress/g, ''));
    this.setState({ linkCopy: true });
  }

  removeFavorite(favoriteRecipes) {
    const { id, setFavorite } = this.props;
    const favoriteFilter = favoriteRecipes.filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteFilter));
    setFavorite(favoriteFilter);
  }

  heartToggle() {
    const { heartToggle } = this.state;
    const { getDrinkDetails, getFavorite, setFavorite } = this.props;
    const newFavorite = {
      id: getDrinkDetails.idDrink,
      type: 'bebida',
      area: '',
      category: getDrinkDetails.strCategory,
      alcoholicOrNot: getDrinkDetails.strAlcoholic,
      name: getDrinkDetails.strDrink,
      image: getDrinkDetails.strDrinkThumb,
    };
    let favoriteRecipes = [];
    if (getFavorite) {
      favoriteRecipes = [...getFavorite, newFavorite];
    } else {
      favoriteRecipes = [newFavorite];
    }
    if (heartToggle) {
      this.setState({ heartToggle: false });
      this.removeFavorite(favoriteRecipes);
    } else {
      this.setState({ heartToggle: true });
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setFavorite(favoriteRecipes);
    }
  }

  render() {
    const { getDrinkDetails } = this.props;
    const { linkCopy, heartToggle } = this.state;

    return (
      <div>
        <div>
          <img
            src={ getDrinkDetails.strDrinkThumb }
            alt={ getDrinkDetails.strDrink }
            data-testid="recipe-photo"
            className="image"
          />
        </div>
        <div className="title">
          <h2 data-testid="recipe-title">{getDrinkDetails.strDrink}</h2>
          <div className="btns">
            <button
              className="btn"
              type="button"
              data-testid="share-btn"
              onClick={ () => this.copyCodeToClipboard() }
            >
              <img src={ shareIcon } alt="share" className="icoBtn" />
            </button>
            <button
              className="btn"
              type="button"
              onClick={ () => this.heartToggle() }
            >
              { heartToggle ? <img
                src={ blackHeartIcon }
                alt="favorit"
                data-testid="favorite-btn"
                className="icoBtn"
              /> : <img
                src={ whiteHeartIcon }
                alt="favorit"
                data-testid="favorite-btn"
                className="icoBtn"
              />}
            </button>
            { linkCopy && <p>Link copiado!</p> }
          </div>
        </div>
        <p
          data-testid="recipe-category"
          className="sub"
        >
          {getDrinkDetails.strAlcoholic}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getDrinkDetails: state.FoodAndDrinkDetailsReducer.drinkDetails,
  getFavorite: state.ButtonReducer.favoriteRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  setDrinksDetails: (id) => dispatch(drinkDetailsThunk(id)),
  setFavorite: (favorite) => dispatch(favoriteRecipesAction(favorite)),
});

DrinkCardDetails.propTypes = ({
  getDrinkDetails: PropTypes.arrayOf(PropTypes.object),
  setDrinksDetails: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(DrinkCardDetails);
