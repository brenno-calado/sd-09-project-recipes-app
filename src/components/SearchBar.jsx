import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchRecipe, setRedirect } from '../actions';
import RecipesContext from '../contexts/RecipesContext';

const SEARCH_INITIAL_STATE = {
  searchType: '',
  searchText: '',
};

function SearchBar({ dispatchSearch, category, dispatchRedirect }) {
  const [search, setSearch] = useState(SEARCH_INITIAL_STATE);
  const { setLoading } = useContext(RecipesContext);

  const handleChange = ({ target: { name, value } }) => (
    setSearch({ ...search, [name]: value })
  );

  const searchRecipes = async () => {
    if (search.searchType === 'Primeira Letra' && search.searchText.length !== 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    setLoading(true);
    await dispatchSearch(search.searchType, search.searchText, category);
    setLoading(false);
    dispatchRedirect();
  };

  const renderRadios = () => (
    <>
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="searchType"
          id="ingredient"
          value="Ingrediente"
          onChange={ handleChange }
        />
        {' Ingrediente'}
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          type="radio"
          name="searchType"
          id="name"
          value="Nome"
          onChange={ handleChange }
        />
        {' Nome'}
      </label>
      <label htmlFor="letter">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="searchType"
          id="letter"
          value="Primeira Letra"
          onChange={ handleChange }
        />
        {' Primeira Letra'}
      </label>
    </>
  );

  return (
    <section>
      <div className="d-flex align-items-center input-group">
        <input
          className="ml-2 p-1 form-control"
          data-testid="search-input"
          type="text"
          name="searchText"
          onChange={ handleChange }
        />
        <button
          className="btn btn-secondary col-4 mr-2"
          id="button-addon2"
          data-testid="exec-search-btn"
          type="button"
          onClick={ searchRecipes }
        >
          Pesquisar
        </button>
      </div>
      <div className="d-flex flex-row justify-content-around mt-3">
        { renderRadios() }
      </div>
    </section>
  );
}

SearchBar.propTypes = {
  dispatchSearch: PropTypes.func,
  dispatchRedirect: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispatchSearch: (type, text, category) => (
    dispatch(searchRecipe(type, text, category))
  ),
  dispatchRedirect: () => dispatch(setRedirect()),
});

export default connect(null, mapDispatchToProps)(SearchBar);
