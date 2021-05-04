import React from 'react';
import { arrayOf, shape } from 'prop-types';
import Card from './Card';

export default function Recommendations({ data }) {
  return (
    <section className="carrousel">
      <Card data={ data } />
    </section>
  );
}

Recommendations.propTypes = {
  data: arrayOf(shape()),
}.isRequired;
