import { arrayOf, string } from 'prop-types';
import React from 'react';
import { Nav } from 'react-bootstrap';

export default function Categories({ categories, selected, callback }) {
  const size = 5;

  return (
    <Nav fill variant="pills" defaultActiveKey={ selected }>
      <Nav.Item>
        <Nav.Link eventKey="All">All</Nav.Link>
      </Nav.Item>

      {categories && (categories.slice(0, size)).map(({ strCategory }, index) => (
        <Nav.Item key={ `category-${index}` }>
          <Nav.Link
            eventKey={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => callback(strCategory) }
          >
            {strCategory}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

Categories.propTypes = {
  categories: arrayOf,
  path: string,
}.isRequired;
