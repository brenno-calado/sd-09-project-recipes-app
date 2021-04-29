import React from 'react';
import { connect } from 'react-redux';
import { array } from 'prop-types';
import { categoriesfetchApiAction } from '../actions';

class CategoriesList extends React.Component {
  componentDidMount() {
    const { categoriesFetchApi } = this.props;
    categoriesFetchApi();
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
});

CategoriesList.propTypes = {
  categories: array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
