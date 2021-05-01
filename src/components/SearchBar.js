import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import setSearchOptions from '../redux/actions/search';
import fetchSearchRecipes from '../redux/actions/recipes';

const radioElementsParams = [
  {
    label: 'Ingrediente',
    inputParams: {
      id: 'ingredientInput',
      'data-testid': 'ingredient-search-radio',
      name: 'searchOption',
      value: 'i',
    },
  },
  {
    label: 'Nome',
    inputParams: {
      id: 'nameInput',
      'data-testid': 'name-search-radio',
      name: 'searchOption',
      value: 's',
    },
  },
  {
    label: 'Primeira Letra',
    inputParams: {
      id: 'firstLetterInput',
      'data-testid': 'first-letter-search-radio',
      name: 'searchOption',
      value: 'f',
    },
  },
];

const renderRadioElementFor = ({ label, inputParams, callback }) => (
  <label
    htmlFor={ inputParams.id }
    key={ inputParams.id }
  >
    <input type="radio" { ...inputParams } onClick={ callback } />
    { label }
  </label>
);

const SearchBar = () => {
  const currentLocation = useHistory().location.pathname;
  const isFoodsPage = currentLocation.includes('comida');

  const [searchText, setSearchText] = useState('');
  const [searchOption, setSearchOption] = useState('i');
  const dispatch = useDispatch();
  const isInvalidSearch = searchOption === 'f' && searchText.length > 1;
  const textInputEvent = ({ target: { value } }) => setSearchText(value);
  const radioInputEvent = ({ target: { value } }) => setSearchOption(value);
  const radioElementsProps = radioElementsParams
    .map((item) => ({ ...item, callback: radioInputEvent }));

  return (
    <form>
      <input
        data-testid="search-input"
        type="text"
        onChange={ textInputEvent }
      />
      { radioElementsProps.map((element) => renderRadioElementFor(element)) }
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => {
          if (isInvalidSearch) {
            return alert('Sua busca deve conter somente 1 (um) caracter');
          }
          const searchParams = { [searchOption]: searchText, isFoodsPage };
          dispatch(setSearchOptions(searchParams));
          dispatch(fetchSearchRecipes());
        } }
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
