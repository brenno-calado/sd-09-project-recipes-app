import React from 'react';
import { connect } from 'react-redux';
import { array } from 'prop-types';
import {
  fetchRecipesByCategoryAction,
  categoriesfetchApiAction,
  setIsCategoryToTrueAction,
} from '../actions';

class CategoriesList extends React.Component {
  constructor() {
    super();
    this.state = {
      category: 'Inicial',
    };
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

  render() {
    const { categories } = this.props;
    const mxmcategories = 5;
    const filteredCategories = categories && categories
      .filter((_, index) => index < mxmcategories);
    return (
      <div>
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

const mapDispatchToProps = (dispach) => ({
  categoriesFetchApi: () => dispach(categoriesfetchApiAction()),
  fetchRepiciesByCategory: (categorie, category) => (
    dispach(fetchRecipesByCategoryAction(categorie, category))),
  setIsCategoryToTrue: () => dispach(setIsCategoryToTrueAction()),
});

CategoriesList.propTypes = {
  categories: array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
