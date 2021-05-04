import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import '../css/HorizontalScrollMenu.css';

const HorizontalScrollMenu = ({ recommended }) => {
  const [scrollX, setScrollX] = useState(0);
  const [recommendedsRecipes, setRecommendedsRecipes] = useState();
  const magicNumber = 250;
  const handleWithLeftArrowClick = () => {
    const maxWidth = (recommendedsRecipes.length * magicNumber);
    const slides = 3;
    let x = scrollX + Math.round(maxWidth / slides);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };
  const handleWithRightArrowClick = () => {
    const maxWidth = -(recommendedsRecipes.length * magicNumber);
    const slides = 3;
    let x = scrollX;
    x += Math.round(maxWidth / slides);
    if (x === maxWidth) return;
    setScrollX(x);
  };

  useEffect(() => {
    const NUMBER_SIX = 6;
    setRecommendedsRecipes(recommended.slice(0, NUMBER_SIX));
  }, [recommended]);

  const renderList = () => (
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

  return (
    <section className="recommendedArea">
      <div
        className="recommendedArea-left"
        role="button"
        tabIndex="0"
        onKeyPress={ handleWithRightArrowClick }
        onClick={ handleWithLeftArrowClick }
      >
        <NavigateBeforeIcon style={ { fontSize: 40 } } />
      </div>
      <div
        className="recommendedArea-right"
        onClick={ handleWithRightArrowClick }
        role="button"
        tabIndex="0"
        onKeyPress={ handleWithRightArrowClick }
      >
        <NavigateNextIcon style={ { fontSize: 40 } } />
      </div>

      { recommendedsRecipes !== undefined && renderList()}

    </section>
  );
};

HorizontalScrollMenu.propTypes = {
  recommended: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HorizontalScrollMenu;
