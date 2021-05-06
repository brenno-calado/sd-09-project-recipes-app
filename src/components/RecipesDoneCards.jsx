import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import RecomendedFavBtn from './RecomendedFavBtn';

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

function createTagElements(recipe, index) {
  let arrayOfElements;
  if (recipe.tags) {
    const allTags = typeof recipe.tags === 'string'
      ? recipe.tags.split(',') : recipe.tags;
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

function createCard(recipe, index, typeRecipe) {
  const tagElements = createTagElements(recipe, index);
  const redirectPath = createRedirectPath(recipe);
  return (
    <Card
      style={ { width: '18rem' } }
      key={ index }
      data-testid={ `${index}-recomendation-card` }
    >
      <p hidden>{recipe.id}</p>
      <p hidden>{recipe.type}</p>
      <Link to={ redirectPath }>
        <Card.Img
          data-testid={ `${index}-horizontal-image` }
          variant="top"
          src={ recipe.image }
        />
      </Link>
      <Card.Body>
        <Link to={ redirectPath }>
          <Card.Title data-testid={ `${index}-horizontal-name` }>
            { recipe.name }
          </Card.Title>
        </Link>
        <Card.Subtitle data-testid={ `${index}-horizontal-top-text` }>
          {recipe.type === 'comida'
            ? `${recipe.area} - ${recipe.category}`
            : `${recipe.alcoholicOrNot}`}
        </Card.Subtitle>
        <Card.Text data-testid={ `${index}-horizontal-done-date` }>
          { recipe.doneDate }
        </Card.Text>
        {typeRecipe === 'done' ? ''
          : (
            <RecomendedFavBtn
              recipe={ recipe }
              index={ index }
            />
          )}
        {tagElements}
        <Button
          data-testid={ `${index}-horizontal-share-btn` }
          type="button"
          src="shareIcon"
          onClick={ handleClickCopy }
        >
          Share
        </Button>
        <span />
      </Card.Body>
    </Card>
  );
}

function RecipesDoneCards({ recipesDoneList, doneOrFavorite }) {
  const { typeRecipe } = doneOrFavorite;
  return (
    !recipesDoneList ? (<p>Nenhuma receita a ser listada</p>) : (
      <section>
        {recipesDoneList
          .map((recipe, index) => createCard(recipe, index, typeRecipe))}
      </section>)
  );
}

RecipesDoneCards.propTypes = { recipesDoneContext: PropTypes.array }.isRequired;

export default RecipesDoneCards;
