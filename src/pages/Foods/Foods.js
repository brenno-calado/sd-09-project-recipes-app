import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import Card from '../../components/Card';
import Header from '../../components/Header';
import { FoodCtx } from '../../context/contextFood';
import Footer from '../../components/Footer';
import CategoryBtn from '../../components/Buttons/CategoryBtn';

import './Foods.css';

function Foods({ location: { state = false } }) {
  const STOP_INDEX = 11;
  const { foodApi: { meals }, setFilterFood } = useContext(FoodCtx);
  const [category, setCategory] = useState('');
  const [ingredient, setIngredient] = useState('');
  const history = useHistory();
  const onClickAll = ({ target }) => {
    if (state && state.fromExplorerFoodsIngredients) {
      state.fromExplorerFoodsIngredients = false;
    }
    setCategory(target.value);
    setFilterFood({ key: 'name', value: category });
  };
  const onClickCategory = ({ target }) => {
    if (category !== target.value) {
      setCategory(target.value);
      if (state && state.fromExplorerFoodsIngredients) {
        state.fromExplorerFoodsIngredients = false;
      }
    } else { setCategory(''); }
  };

  useEffect(() => {
    if (state !== undefined && state.fromExplorerFoodsIngredients) {
      setIngredient(state.ingredient);
      setFilterFood({ key: 'ing', value: ingredient });
    } else {
      setFilterFood({ key: 'category', value: category });
    }
  }, [category, setFilterFood, state, ingredient]);

  useEffect(() => {
    const categorySetting = (categoryState) => {
      if (categoryState === '') {
        setFilterFood({ key: 'name', value: categoryState });
      }
    }; categorySetting(category);
  }, [category, setFilterFood]);

  const render = () => (
    <div>
      <Header title="Comidas" icon="true" currentPage="Foods" />
      <CategoryBtn
        label="Foods"
        onClickAll={ onClickAll }
        onClickCategory={ onClickCategory }
      />
      <div className="cards">
        {meals && meals
          .filter((meal, index) => index <= STOP_INDEX)
          .map((item, index) => (
            <Card
              key={ item.idMeal }
              id={ item.idMeal }
              name={ item.strMeal }
              img={ item.strMealThumb }
              index={ index }
              onClick={ () => history.push(`/comidas/${item.idMeal}`) }
            />
          ))}

        { (meals && meals.length === 1 && category === '')
          ? history.push(`/comidas/${meals[0].idMeal}`)
          : '' }
        { meals === null
        // eslint-disable-next-line no-alert
          ? alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
          : ''}
      </div>
      <div className="spacing" />
      <Footer />
    </div>
  );

  return (render());
}

Foods.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.shape({
      fromExplorerFoodsIngredients: PropTypes.bool,
      ingredient: PropTypes.string,
    }),
    key: PropTypes.string,
  }),
};

Foods.defaultProps = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.string,
    key: PropTypes.string,
  }),
};

export default Foods;
