import React, { useContext, useState } from 'react';
import { bool } from 'prop-types';
import { Context } from '../context';
import { fecthByName, fetchByFirstLetter, fetchByIngredient } from '../services/api';

function SearchBar({ isMeal }) {
  const { updateData } = useContext(Context);
  const [state, setState] = useState({ search: '', searchBy: '' });

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const handleSearch = () => {
    const { search, searchBy } = state;
    switch (searchBy) {
    case 'name':
      return updateData(fecthByName(search, isMeal));
    case 'ingredient':
      return updateData(fetchByIngredient(search, isMeal));
    case 'firstLetter':
      return search.length > 1
        ? window.alert('Sua busca deve conter somente 1 (um) caracter')
        : updateData(fetchByFirstLetter(search, isMeal));
    default:
      break;
    }
  };

  const createInput = (testid, name, type, value) => (
    <input
      data-testid={ testid }
      id={ value }
      name={ name }
      value={ value }
      type={ type }
      onChange={ handleChange }
      placeholder={ type === 'text' && 'Busca de receitas' }
      className={ type === 'text' ? 'form-control mb-3' : '' }
    />
  );

  return (
    <section
      className="d-flex flex-column p-3 mt-2 border-top border-white bg-orange-secondary"
    >
      { createInput('search-input', 'search', 'text') }
      <div className="d-flex justify-content-around">
        <label htmlFor="ingredient" className="form-label text-white">
          { createInput('ingredient-search-radio', 'searchBy', 'radio', 'ingredient') }
          &nbsp;Ingrediente
        </label>
        <label htmlFor="name" className="form-label text-white">
          { createInput('name-search-radio', 'searchBy', 'radio', 'name') }
          &nbsp;Nome
        </label>
        <label htmlFor="firstLetter" className="form-label text-white">
          { createInput('first-letter-search-radio', 'searchBy', 'radio', 'firstLetter') }
          &nbsp;Primeira letra
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleSearch }
        className="btn btn-blue-primary m-auto"
      >
        Buscar
      </button>
    </section>
  );
}

SearchBar.propTypes = { isMeal: bool }.isRequired;

export default SearchBar;
