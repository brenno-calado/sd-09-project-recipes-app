import React from 'react';
import { arrayOf, shape } from 'prop-types';
import Card from './Card';
import '../styles/Recommendations.css';

export default function Recommendations({ data }) {
  return (
    <section className="carrousel">
      {/* <button type="button">Prev</button>
      <div className="carrousel__slider"> */}
      <Card data={ data } />
      {/* </div>
      <button type="button">Next</button> */}
    </section>
  );
}

Recommendations.propTypes = {
  data: arrayOf(shape()),
}.isRequired;
