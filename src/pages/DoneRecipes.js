import React, { useState } from 'react';
import { Header } from '../components';
import shareIcon from '../images/shareIcon.svg';

const data = [{
  id: 0,
  type: 'Food',
  area: 'canada',
  category: 'chicken',
  name: 'frango assado',
  image: 'imagem',
  doneDate: 'xx/xx/xxxx',
  tags: ['tag1', 'tag2', 'tag3'],
},
{
  id: 1,
  type: 'Drinks',
  area: '',
  alcoholicOrNot: 'alcoholic',
  name: 'caipirinha',
  image: 'imagem',
  doneDate: 'xx/xx/xxxx',
  tags: ['tag1', 'tag2', 'tag3'],
}];

function DoneRecipes() {
  const [filter, setFilter] = useState('');

  const createButton = (testid, value, onClick) => (
    <button data-testid={ testid } value={ value } type="button" onClick={ onClick }>
      { value || 'All' }
    </button>
  );

  const handleClick = ({ target: { value } }) => setFilter(value);

  return (
    <section>
      <Header title="Receitas Feitas" />
      { createButton('filter-by-all-btn', '', handleClick) }
      { createButton('filter-by-food-btn', 'Food', handleClick) }
      { createButton('filter-by-drink-btn', 'Drinks', handleClick) }
      { data.filter(({ type }) => type.includes(filter)).map(
        (
          { category, alcoholicOrNot, name, image, doneDate, tags }, index,
        ) => (
          <div key={ name }>
            <img data-testid={ `${index}-horizontal-image` } src={ image } alt={ name } />
            <p data-testid={ `${index}-horizontal-top-text` }>
              { category || alcoholicOrNot }
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
            <button data-testid={ `${index}-horizontal-share-btn` } type="button">
              <img src={ shareIcon } alt="" />
            </button>
            { tags.map((tag, tagId) => (
              <p data-testid={ `${tagId}-${tag}-horizontal-tag` } key={ tag }>{ tag }</p>
            ))}
          </div>
        ),
      ) }
    </section>
  );
}

export default DoneRecipes;
