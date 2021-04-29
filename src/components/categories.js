import { arrayOf, string } from 'prop-types';
import React from 'react';
import { Nav } from 'react-bootstrap';

export default function Categories({ categories, path }) {
  const size = 5;

  return (
    <Nav fill variant="pills" defaultActiveKey={ path }>
      <Nav.Item>
        <Nav.Link eventKey={ path } href={ path }>All</Nav.Link>
      </Nav.Item>

      {categories && (categories.slice(0, size)).map(({ strCategory }, index) => (
        <Nav.Item key={ `category-${index}` }>
          <Nav.Link
            eventKey={ `${path}/${strCategory}` }
            href={ `${path}/${strCategory}` }
            data-testid={ `${strCategory}-category-filter` }
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
