import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { ReactComponent as ShareIcon } from '../images/shareIcon.svg';

function createTagElements(recipeDone, index) {
  let arrayOfElements;
  console.log(recipeDone);
  if (recipeDone.tags) {
    const allTags = typeof recipeDone.tags === 'string'
      ? recipeDone.tags.split(',') : recipeDone.tags;
    arrayOfElements = allTags.map((recipeTag) => (
      <span key={ recipeTag }>
        <Card.Text
          data-testid={ `${index}-${recipeTag}-horizontal-tag` }
        >
          {recipeTag}
        </Card.Text>
      </span>
    ));
  }
  return arrayOfElements;
}

function createCard(recipeDone, index) {
  const tagElements = createTagElements(recipeDone, index);
  return (
    <Card
      style={ { width: '18rem' } }
      key={ index }
      data-testid={ `${index}-recomendation-card` }
    >
      <Card.Img
        data-testid={ `${index}-horizontal-image` }
        variant="top"
        src={ recipeDone.image }
      />
      <Card.Body>
        <Card.Title data-testid={ `${index}-horizontal-name` }>
          { recipeDone.name }
        </Card.Title>
        <Card.Subtitle data-testid={ `${index}-horizontal-top-text` }>
          {recipeDone.type === 'comida'
            ? `${recipeDone.area} - ${recipeDone.category}`
            : `${recipeDone.alcoholicOrNot}`}
        </Card.Subtitle>
        <Card.Text data-testid={ `${index}-horizontal-done-date` }>
          { recipeDone.doneDate }
        </Card.Text>
        {tagElements}
        <Button
          data-testid={ `${index}-horizontal-share-btn` }
          type="button"
          src="shareIcon"
        >
          <ShareIcon />
        </Button>
      </Card.Body>
    </Card>
  );
}

function RecipesDoneCards({ recipesDoneList }) {
  return (
    !recipesDoneList ? (<p>Nenhuma Receita Concluida</p>) : (
      <section>
        {recipesDoneList.map((recipe, index) => createCard(recipe, index))}
      </section>)
  );
}

RecipesDoneCards.propTypes = { recipesDoneContext: PropTypes.array }.isRequired;

export default RecipesDoneCards;
