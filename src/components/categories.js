import { arrayOf, string } from 'prop-types';
import React from 'react';
import { Nav } from 'react-bootstrap';

export default function Categories({ categories, selected, callback }) {
  const size = 5;
  console.log(selected);

  return (
    <Nav fill variant="pills" defaultActiveKey={ selected }>
      <Nav.Item>
        <Nav.Link
          active={ selected === 'All' }
          eventKey="All"
          data-testid="All-category-filter"
          onClick={ () => callback('All') }
        >
          All
        </Nav.Link>
      </Nav.Item>

      {categories && (categories.slice(0, size)).map(({ strCategory }, index) => (
        <Nav.Item key={ `category-${index}` }>
          <Nav.Link
            active={ selected === strCategory }
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
