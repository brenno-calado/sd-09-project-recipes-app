import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import Card from './styled';

const timeoutClipboard = 2000;

function ListDoneRecipeCards({ done = [] }) {
  const [clipboard, setClipboard] = useState(false);

  const handleClipboard = (item) => {
    clipboardCopy(`http://localhost:3000/${item.type}s/${item.id}`);
    setClipboard(true);
    setTimeout(() => setClipboard(false), timeoutClipboard);
  };

  const renderCard = (item, index) => (
    <Card key={ item.id } data-testid={ `${index}-recipe-card` }>
      <span data-testid={ `${index}-horizontal-top-text` }>
        {item.alcoholicOrNot || `${item.area} - ${item.category}`}
      </span>
      <Link to={ `/${item.type}s/${item.id}` }>
        <img
          style={ { width: '100%' } }
          data-testid={ `${index}-horizontal-image` }
          src={ item.image }
          alt={ `${item.name}-done-recipe` }
        />
        <span data-testid={ `${index}-horizontal-name` }>{item.name}</span>
      </Link>
      <span data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</span>
      { item.tags.map((tagName) => (
        <span
          key={ `${tagName}-${index}` }
          data-testid={ `${index}-${tagName}-horizontal-tag` }
        >
          {tagName}
        </span>
      )) }
      <div>
        <button type="button" onClick={ handleClipboard.bind(null, item) }>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share-status"
          />
        </button>
      </div>
      {clipboard && <span>Link copiado!</span>}
    </Card>
  );

  const renderCards = () => done.map(
    (recipe, index) => renderCard(recipe, index),
  );
  return done.length > 0 && renderCards();
}

export default ListDoneRecipeCards;
