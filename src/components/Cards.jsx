import React from 'react';
import { connect } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { arrayOf } from 'prop-types';
import Card from './Card';
import './Cards.css';

function Cards(props) {
  let { items } = props;
  const location = useLocation();
  const idType = (location.pathname === '/comidas') ? 'idMeal' : 'idDrink';
  const maxItemsToshow = 12;
  if (items.length > maxItemsToshow) items = items.slice(0, maxItemsToshow);
  return (
    <div className="Cards">
      {items.length === 0 && <p>Faça uma busca</p>}
      {items.length === 1 && <Redirect
        to={ `${location.pathname}/${items[0][idType]}` }
      />}
      {items.map((item, index) => <Card item={ item } index={ index } key={ index } />)}
    </div>
  );
}

const mapStateToProps = (state) => ({
  items: state.searchBar.items,
});

Cards.propTypes = {
  items: arrayOf(),
}.isRequired;

export default connect(mapStateToProps)(Cards);
