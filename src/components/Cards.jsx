import React from 'react';
import { connect } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { arrayOf } from 'prop-types';

function Cards(props) {
  const { items } = props;
  const location = useLocation();
  const idType = (location.pathname === '/comidas') ? 'idMeal' : 'idDrink';
  return (
    <div>
      {items.length === 0 && <p>Faça uma busca</p>}
      {items.length === 1 && <Redirect
        to={ `${location.pathname}/${items[0][idType]}` }
      />}
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
