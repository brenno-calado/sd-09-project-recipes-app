import React from 'react';
import { connect } from 'react-redux';
import { array } from 'prop-types';
import {
  fetchRecipesByCategoryAction,
  categoriesfetchApiAction,
  setIsCategoryToTrueAction,
  defaultFetchApiAction,
} from '../actions';

class CategoriesList extends React.Component {
  constructor() {
    super();
    this.state = {
      category: 'Inicial',
    };
    this.allBtnHandleClick = this.allBtnHandleClick.bind(this);
  }

  componentDidMount() {
    const { categoriesFetchApi } = this.props;
    categoriesFetchApi();
  }

  handleClick(categorie) {
    const { category } = this.state;
    console.log(categorie, category);
    const { fetchRepiciesByCategory, setIsCategoryToTrue } = this.props;
    fetchRepiciesByCategory(categorie, category);
    setIsCategoryToTrue();
    if (categorie !== category) {
      this.setState({ category: categorie });
    }
    if (categorie === category) {
      this.setState({ category: 'Inicial' });
    }
  }

  allBtnHandleClick() {
    const { defaultFetchApi } = this.props;
    defaultFetchApi();
  }

  render() {
    const { categories } = this.props;
    const mxmcategories = 5;
    const filteredCategories = categories && categories
      .filter((_, index) => index < mxmcategories);
    return (
      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ this.allBtnHandleClick }
        >
          All
        </button>
        {filteredCategories.map((categorie) => (
          <button
            type="button"
            key={ categorie.strCategory }
            data-testid={ `${categorie.strCategory}-category-filter` }
            onClick={ () => this.handleClick(categorie.strCategory) }
          >
            {categorie.strCategory}
          </button>))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.searchInputReducer.categories,
});

const mapDispatchToProps = (dispatch) => ({
  categoriesFetchApi: () => dispatch(categoriesfetchApiAction()),
  fetchRepiciesByCategory: (categorie, category) => (
    dispatch(fetchRecipesByCategoryAction(categorie, category))),
  setIsCategoryToTrue: () => dispatch(setIsCategoryToTrueAction()),
  defaultFetchApi: () => dispatch(defaultFetchApiAction()),
});

CategoriesList.propTypes = {
  categories: array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
