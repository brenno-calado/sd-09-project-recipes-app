import React, { useEffect, useState } from 'react';
import { string, number, func, arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
import inputAction from '../../redux/actions/inputAction';
import styles from './checkInput.module.css';

function CheckInput({ index, handleCheckedValue, item, match, type,
  urlType, inputChange }) {
  const [checkedValue, setCheckedValue] = useState();
  const { params, path } = match;
  const { id } = params;

  useEffect(() => {
    if (path === `/${urlType}/:id/in-progress`) {
      const localElements = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (localElements && localElements[type] && localElements[type][id]) {
        localElements[type][id].forEach((element) => {
          if (String(item) === element) {
            setCheckedValue(true);
          }
        });
      }
    }
  }, [id, path, type, urlType, item]);

  function handleDisableBtn({ target }) {
    const { checked, name } = target;
    if (checked) {
      setCheckedValue(true);
    } else {
      setCheckedValue(false);
    }
    inputChange(name);
  }

  return (
    <div data-testid={ `${index}-ingredient-step` }>
      <label
        className={ checkedValue && styles.checked }
        htmlFor={ `${index}-ingredientDrinkStep` }
      >
        <input
          className={ styles.checkInput }
          name={ item }
          id={ `${index}-ingredientDrinkStep` }
          type="checkbox"
          onChange={ (event) => { handleCheckedValue(event); handleDisableBtn(event); } }
          key={ Math.random() }
          checked={ checkedValue }
        />
        { item }
      </label>
    </div>
  );
}

CheckInput.propTypes = {
  index: number,
  handleCheckedValue: func,
  item: arrayOf(string),
  params: shape(),
  match: shape(),
  path: string,
  id: string,
  type: string,
  urlType: string,
  inputChange: func,
};

CheckInput.defaultProps = {
  index: 0,
  handleCheckedValue: () => {},
  item: '',
  params: {},
  match: {},
  path: '',
  id: '',
  type: '',
  urlType: '',
  inputChange: () => {},
};

const mapDispatchToProps = (dispatch) => ({
  inputChange: (text) => dispatch(inputAction(text)),
});

export default connect(null, mapDispatchToProps)(CheckInput);
