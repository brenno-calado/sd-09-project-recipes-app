import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function Details() {
  return (
    <div>
      <img src="https://www.themealdb.com/images/media/meals/58oia61564916529.jpg" alt="Recope image" data-testid="recipe-photo"/>
      <div>
        <h1 data-testid="recipe-title">Title</h1>
        <button type="button" data-testid="share-btn">
          <img src={ shareIcon } alt="Share button" />
        </button>
        <button type="button" data-testid="favorite-btn">
          <img src={ blackHeartIcon } alt="Favorite button" />
        </button>
        <h3 data-testid="recipe-category">categoria</h3>
        <div>
          <h2>Ingredients</h2>
          <ul>
            <li data-testid={ `${0}-ingredient-name-and-measure` }>1</li>
            <li data-testid={ `${1}-ingredient-name-and-measure` }>2</li>
            <li data-testid={ `${2}-ingredient-name-and-measure` }>3</li>
          </ul>
        </div>
        <div>
          <h2>Instructions</h2>
          <p data-testid="instructions">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only </p>
        </div>
        <div>
          <h2>Video</h2>
          <iframe src="https://www.youtube.com/embed/VVnZd8A84z4" title="video" frameBorder="0" data-testid="video" />
        </div>
        <div>
          <h2>Recomended</h2>
          <div data-testid={ `${0}-recomendation-card` }>comidas</div>
        </div>
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </div>
    </div>
  );
}

export default Details;
