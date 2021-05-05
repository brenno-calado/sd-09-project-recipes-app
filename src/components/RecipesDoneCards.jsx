import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { ReactComponent as ShareIcon } from '../images/shareIcon.svg';

function createRedirectPath(recipe) {
  return `/${recipe.type}s/${recipe.id}`;
}

async function handleClickCopy({ target }) {
  let cardParentElement = target;
  if (!target.innerHTML) {
    cardParentElement = target.parentNode.parentNode;
  }
  const cardElement = cardParentElement.parentNode.parentNode;
  const cardElementTextContainer = cardElement.lastChild;
  const id = cardElement.firstChild.innerText;
  const type = cardElement.children[1].innerText;
  const path = `http://localhost:3000/${type}s/${id}`;
  cardElementTextContainer.lastChild.innerText = 'Link copiado!';
  const maxShowTime = 1500;
  setTimeout(() => {
    cardElementTextContainer.lastChild.innerText = '';
  }, maxShowTime);
  await navigator.clipboard.writeText(path);
}

function createTagElements(recipeDone, index) {
  let arrayOfElements;
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
  const redirectPath = createRedirectPath(recipeDone);
  return (
    <Card
      style={ { width: '18rem' } }
      key={ index }
      data-testid={ `${index}-recomendation-card` }
    >
      <p hidden>{recipeDone.id}</p>
      <p hidden>{recipeDone.type}</p>
      <Link to={ redirectPath }>
        <Card.Img
          data-testid={ `${index}-horizontal-image` }
          variant="top"
          src={ recipeDone.image }
        />
      </Link>
      <Card.Body>
        <Link to={ redirectPath }>
          <Card.Title data-testid={ `${index}-horizontal-name` }>
            { recipeDone.name }
          </Card.Title>
        </Link>
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
          onClick={ handleClickCopy }
        >
          <ShareIcon />
        </Button>
        <span />
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
