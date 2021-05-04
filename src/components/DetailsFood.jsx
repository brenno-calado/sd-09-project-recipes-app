import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { objectOf } from 'prop-types';
import Carousel from 'react-multi-carousel';
import shareIcon from '../images/shareIcon.svg';
import { fetchBeverages } from '../services/fetchRecipes';
import Card from './Card';
import 'react-multi-carousel/lib/styles.css';
import LikeBtn from './LikeBtn';

function DetailsFood({ recipe, inProgressRecipes, handleClick, done }) {
  const [recommends, setRecommends] = useState([]);
  const [allIngrdients, setAllIngrdients] = useState([]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const location = useLocation();
  const {
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
    strYoutube,
  } = recipe;
  const embedId = strYoutube
    ? strYoutube.split('https://www.youtube.com/watch?v=')[1]
    : '';
  const responsive = {
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  useEffect(() => {
    const getIngredients = () => {
      const ingredients = [];
      const ingreQtt = Object.keys(recipe)
        .filter((item) => item.includes('strIngredient'));
      const measureQtt = Object.keys(recipe)
        .filter((item) => item.includes('strMeasure'));
      ingreQtt.forEach((item, index) => {
        if (recipe[item] !== null && recipe[item] !== '') {
          ingredients.push({
            name: recipe[item],
            quantity: recipe[measureQtt[index]],
          });
        }
      });
      setAllIngrdients(ingredients);
    };
    const toSlice = 6;
    fetchBeverages().then((data) => setRecommends(data.slice(0, toSlice)));
    getIngredients();
  }, [recipe]);

  const renderButton = () => (
    <Link to={ `${location.pathname}/in-progress` }>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ handleClick }
      >
        {!inProgressRecipes ? 'Iniciar Receita' : 'Continuar Receita'}
      </button>
    </Link>
  );

  const shareBtn = async () => {
    const link = `http://localhost:3000${location.pathname}`;
    setIsLinkCopied(true);
    return navigator.clipboard.writeText(link);
  };

  return (
    <div className="Details">
      <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
      <div className="title-btns">
        <div>
          <h1 data-testid="recipe-title">{strMeal}</h1>
          <h3 data-testid="recipe-category">{strCategory}</h3>
        </div>
        <div>
          <button type="button" data-testid="share-btn" onClick={ shareBtn }>
            <img src={ shareIcon } alt="Share button" />
          </button>
          <LikeBtn recipe={ recipe } />
          {isLinkCopied && <p>Link copiado!</p>}
        </div>
      </div>
      <div className="ingredients">
        <h2>Ingredients</h2>
        <div>
          {allIngrdients.map(({ name, quantity }, index) => (
            <p
              key={ Math.random() }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`- ${name} - ${quantity}`}
            </p>
          ))}
        </div>
      </div>
      <div className="instructions">
        <h2>Instructions</h2>
        <p data-testid="instructions">{strInstructions}</p>
      </div>
      <div className="video">
        <h2>Video</h2>
        <iframe
          src={ `https://www.youtube.com/embed/${embedId}` }
          title="video"
          frameBorder="0"
          data-testid="video"
        />
      </div>
      <div className="recomendations">
        <h2>Recomended</h2>
        <Carousel responsive={ responsive }>
          {recommends.map((item, index) => (
            <Card
              cardTestid={ `${index}-recomendation-card` }
              titleTestid={ `${index}-recomendation-title` }
              key={ index }
              item={ item }
              index={ index }
              type="bebidas"
            />
          ))}
        </Carousel>
      </div>
      {!done && renderButton()}
    </div>
  );
}

DetailsFood.propTypes = {
  recipe: objectOf(),
}.isRequired;

export default DetailsFood;
