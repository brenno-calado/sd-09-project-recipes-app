import React from 'react';
import { connect } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { arrayOf, bool } from 'prop-types';
import { resetNotFound } from '../Redux/actions';
import Card from './Card';
import './Cards.css';

function Cards(props) {
  const { notFound } = props;
  let { items } = props;
  const location = useLocation();
  const idType = (location.pathname === '/comidas') ? 'idMeal' : 'idDrink';
  const maxItemsToshow = 12;
  if (items.length > maxItemsToshow) items = items.slice(0, maxItemsToshow);

  const alertNotFound = () => {
    const { notFoundReset } = props;
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    notFoundReset();
  };

  return (
    <div className="Cards">
      {notFound && alertNotFound()}
      {items.length === 0 && <p>Faça uma busca</p>}
      {items.length === 1 && <Redirect
        to={ `${location.pathname}/${items[0][idType]}` }
      />}
      {items.map((item, index) => (
        <Card item={ item } index={ index } key={ item.idType } />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  items: state.searchBar.items,
  notFound: state.searchBar.notFound,
});

const mapDispatchToProps = (dispatch) => ({
  notFoundReset: () => dispatch(resetNotFound()),
});

Cards.propTypes = {
  items: arrayOf(),
  notFound: bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
