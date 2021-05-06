import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { favoriteRecipesAction } from '../action/ButtonAction';
import CardFavorite from '../components/CardFavorite';
import '../styles/Geral.css';

class FavoriteRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.startDone = this.startDone.bind(this);
    this.filterButton = this.filterButton.bind(this);
    this.filterAll = this.filterAll.bind(this);
    this.handleFilter = this.handleFilter.bind(this);

    this.state = {
      recipeFavorite: [],
    };
  }

  componentDidMount() {
    const { setFavorite } = this.props;
    const localFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorite(localFavorite);
    this.startDone(localFavorite);
  }

  handleFilter(removeFavorite) {
    this.setState({ recipeFavorite: removeFavorite });
  }

  startDone(localFavorite) {
    this.setState({ recipeFavorite: localFavorite });
  }

  filterButton(filter) {
    const { getFavoriteRecipes } = this.props;
    const recipeFilter = getFavoriteRecipes.filter((recipe) => recipe.type === filter);
    this.setState({ recipeFavorite: recipeFilter });
  }

  filterAll() {
    const { getFavoriteRecipes } = this.props;
    this.setState({ recipeFavorite: getFavoriteRecipes });
  }

  render() {
    const { recipeFavorite } = this.state;

    return (
      <div className="geral-margin">
        <Header titleHeader="Receitas Favoritas" />
        <section>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ this.filterAll }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => this.filterButton('comida') }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => this.filterButton('bebida') }
          >
            Drinks
          </button>
        </section>
        <section>
          {recipeFavorite && recipeFavorite.map((favorite, index) => (
            <CardFavorite
              key={ `${favorite}${index}` }
              favorite={ favorite }
              index={ index }
              handleFilter={ this.handleFilter }
            />
          ))}
        </section>
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

FavoriteRecipes.propTypes = ({
  getFavoriteRecipes: PropTypes.arrayOf(PropTypes.object),
  setFavorite: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipes);
