import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';
import '../css/HorizontalScrollMenu.css';

const HorizontalScrollMenu = ({ recommended, recipes, type }) => {
  const [scrollX, setScrollX] = useState(0);
  const [recommendedsRecipes, setRecommendedsRecipes] = useState();
  const magicNumber = 250;
  const handleWithLeftArrowClick = () => {
    let maxWidth;
    const slides = 3;
    if (recommendedsRecipes !== undefined) {
      maxWidth = (recommendedsRecipes.length * magicNumber);
    } else {
      maxWidth = (recipes.length * magicNumber);
    }
    let x = scrollX + Math.round(maxWidth / slides);
    console.log(x);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };
  const handleWithRightArrowClick = () => {
    let maxWidth;
    if (recommendedsRecipes !== undefined) {
      maxWidth = -(recommendedsRecipes.length * magicNumber);
      const slides = 3;
      let x = scrollX;
      x += Math.round(maxWidth / slides);
      if (x === maxWidth) return;
      setScrollX(x);
    } else {
      let x = scrollX - Math.round(window.innerWidth);
      const maxWidh = recipes.length * magicNumber;
      console.log(x);
      console.log(window.innerWidth);
      console.log(maxWidh);
      console.log(window.innerWidth - maxWidh);
      if ((window.innerWidth - maxWidh) > x) {
        x = window.innerWidth - maxWidh;
      }
      setScrollX(x);
    }
  };

  useEffect(() => {
    if (recommended !== undefined) {
      const NUMBER_SIX = 6;
      setRecommendedsRecipes(recommended.slice(0, NUMBER_SIX));
    }
  }, [recommended]);

  const renderListRecommended = () => (
    <div className="recommendedArea-listarea">
      <div
        className="recommendedArea-list"
        style={
          { marginLeft: scrollX, width: recommendedsRecipes.length * magicNumber }
        }
      >
        {recommendedsRecipes.length > 0 && recommendedsRecipes.map((e, index) => (
          <div
            className="item"
            data-testid={ `${index}-recomendation-card` }
            key={ e.idDrink !== undefined ? e.idDrink : e.idMeal }
          >
            <img
              src={ e.strDrinkThumb !== undefined ? e.strDrinkThumb : e.strMealThumb }
              alt="foto da receita"
            />
            <p
              data-testid={ `${index}-recomendation-title` }
            >
              { e.strDrink !== undefined ? e.strDrink : e.strMeal }
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderListRecipes = () => (
    <div className="recipes-listarea">
      <div
        className="recommendedArea-list"
        style={
          { marginLeft: scrollX, width: recipes.length * magicNumber }
        }
      >
        {recipes.length > 0 && recipes.map((e, index) => (
          <Link
            to={ e.idDrink !== undefined
              ? `/bebidas/${e.idDrink}`
              : `/comidas/${e.idMeal}` }
            key={ `${e.idMeal}/${index}` }
          >
            <div
              className="item"
              data-testid={ `${index}-recipe-card` }
              key={ e.idDrink !== undefined ? e.idDrink : e.idMeal }
            >
              <img
                src={ e.strDrinkThumb !== undefined ? e.strDrinkThumb : e.strMealThumb }
                alt="foto da receita"
                data-testid={ `${index}-card-img` }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                { e.strDrink !== undefined ? e.strDrink : e.strMeal }
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <section className="recommendedArea">
      <div
        className={ recipes !== undefined ? 'recipes-left' : 'recommendedArea-left' }
        role="button"
        tabIndex="0"
        onKeyPress={ handleWithRightArrowClick }
        onClick={ handleWithLeftArrowClick }
      >
        <NavigateBeforeIcon style={ { fontSize: 40 } } />
      </div>
      <div
        className={recipes !== undefined ? 'recipes-right' : 'recommendedArea-right' }
        onClick={ handleWithRightArrowClick }
        role="button"
        tabIndex="0"
        onKeyPress={ handleWithRightArrowClick }
      >
        <NavigateNextIcon style={ { fontSize: 40 } } />
      </div>

      { recommendedsRecipes !== undefined && type === 'recommended' && renderListRecommended() }
      { recipes !== undefined && type === 'recipes' && renderListRecipes() }

    </section>
  );
};

HorizontalScrollMenu.propTypes = {
  recommended: PropTypes.arrayOf(PropTypes.object).isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};

export default HorizontalScrollMenu;
