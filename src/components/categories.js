import { arrayOf, string } from 'prop-types';
import React from 'react';
import { Nav } from 'react-bootstrap';

export default function Categories({ categories, selected, callback, page }) {
  const size = 5;

  return (
    <Nav fill variant="pills" defaultActiveKey={ selected }>
      <Nav.Item>
        <Nav.Link
          active={ selected === 'All' }
          eventKey="All"
          data-testid={ page === 'main' ? 'All-category-filter' : 'filter-by-all-btn' }
          onClick={ () => callback('All') }
        >
          All
        </Nav.Link>
      </Nav.Item>

      {categories && (categories.slice(0, size)).map(({ strCategory }, index) => {
        const testId = page === 'main' ? `${strCategory}-category-filter`
          : `filter-by-${strCategory.toLowerCase()}-btn`;

        return (
          <Nav.Item key={ `category-${index}` }>
            <Nav.Link
              active={ selected === strCategory }
              eventKey={ strCategory }
              data-testid={ testId }
              onClick={ () => callback(strCategory) }
            >
              {strCategory}
            </Nav.Link>
          </Nav.Item>);
      })}
    </Nav>
  );
}

Categories.propTypes = {
  categories: arrayOf,
  path: string,
}.isRequired;
