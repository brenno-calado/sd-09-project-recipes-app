import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { foodDetailsThunk } from '../action/FoodAndDrinkDetailsAction';
import '../styles/Details.css';
import { favoriteRecipesAction } from '../action/ButtonAction';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

class FoodCardDetails extends React.Component {
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
    const { id, setFoodDetails, setFavorite } = this.props;

    setFoodDetails(id);
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
    const { getFoodDetails, getFavorite, setFavorite } = this.props;
    const newFavorite = {

      id: getFoodDetails.idMeal,
      type: 'comida',
      area: getFoodDetails.strArea,
      category: getFoodDetails.strCategory,
      alcoholicOrNot: '',
      name: getFoodDetails.strMeal,
      image: getFoodDetails.strMealThumb,
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
    const { getFoodDetails } = this.props;
    const { linkCopy, heartToggle } = this.state;

    return (
      <div>
        <div>
          <img
            src={ getFoodDetails.strMealThumb }
            alt={ getFoodDetails.strMeal }
            data-testid="recipe-photo"
            className="image"
          />
        </div>
        <div className="title">
          <h2 data-testid="recipe-title">{getFoodDetails.strMeal}</h2>
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
          {getFoodDetails.strAlcoholic}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getFoodDetails: state.FoodAndDrinkDetailsReducer.foodDetails,
  getFavorite: state.ButtonReducer.favoriteRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  setFoodDetails: (id) => dispatch(foodDetailsThunk(id)),
  setFavorite: (favorite) => dispatch(favoriteRecipesAction(favorite)),
});

FoodCardDetails.propTypes = ({
  getFoodDetails: PropTypes.arrayOf(PropTypes.object),
  setFoodDetails: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FoodCardDetails);
