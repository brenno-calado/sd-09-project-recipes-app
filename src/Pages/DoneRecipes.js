import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { doneRecipesAction } from '../action/ButtonAction';
import CardDone from '../components/CardDone';
import FooterSpec from '../components/FooterSpec';
import Header from '../components/Header';
import '../styles/DoneRecipes.css';

class DoneRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.startDone = this.startDone.bind(this);
    this.filterButton = this.filterButton.bind(this);
    this.filterAll = this.filterAll.bind(this);

    this.state = {
      recipeDone: [],
    };
  }

  componentDidMount() {
    const { setDone } = this.props;
    const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
    setDone(localDone);
    this.startDone(localDone);
  }

  startDone(localDone) {
    this.setState({ recipeDone: localDone });
  }

  filterButton(filter) {
    const { getDoneRecipes } = this.props;
    const recipeFilter = getDoneRecipes.filter((recipe) => recipe.type === filter);
    this.setState({ recipeDone: recipeFilter });
  }

  filterAll() {
    const { getDoneRecipes } = this.props;
    this.setState({ recipeDone: getDoneRecipes });
  }

  render() {
    const { recipeDone } = this.state;

    return (
      <div>
        <Header titleHeader="Receitas Feitas" />
        <section className="sectionBtn">
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
          {recipeDone && recipeDone.map((done, index) => (
            <CardDone key={ `${done}${index}` } done={ done } index={ index } />
          ))}
        </section>
        <FooterSpec />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  getDoneRecipes: state.ButtonReducer.doneRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  setDone: (done) => dispatch(doneRecipesAction(done)),
});

DoneRecipes.propTypes = ({
  getDoneRecipes: PropTypes.arrayOf(PropTypes.object),
  setDone: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(DoneRecipes);
