import React, { useState } from 'react';
import { Header, Footer } from '../components';

function MealsByArea() {
  const [state, setState] = useState({});

  const handleChange = ({ target: { id, value } }) => {
    setState({ ...state, [id]: value });
  };

  const createDropdown = (testid, id, options) => (
    <select data-testid={ testid } id={ id } onChange={ handleChange }>
      { options.map((el) => (
        <option data-testid={ `${el}-option` } key={ el } value={ el }>{ el }</option>)) }
    </select>
  );

  const area = ['Canada', 'Brazil', 'Italia', 'Mexico'];

  return (
    <section>
      <Header title="Explorar Origem" search />
      <h3>PAGINA DE EXPLORAR COMIDAS POR AREA</h3>
      { createDropdown('explore-by-area-dropdown', 'explore-by-area', area)}
      <Footer />
    </section>
  );
}

export default MealsByArea;
