import React, { useEffect, useState } from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import '../css/HorizontalScrollMenu.css';

const HorizontalScrollMenu = ({ recommended }) => {
  const [scrollX, setScrollX] = useState(0);
  const [recommendedsRecipes, setRecommendedsRecipes] = useState();

  const handleWithLeftArrowClick = () => {
    const maxWidth = (recommendedsRecipes.length * 250);
    const slides = 3;
    let x = scrollX + Math.round(maxWidth / slides);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };
  const handleWithRightArrowClick = () => {
    const maxWidth = -(recommendedsRecipes.length * 250);
    const slides = 3;
    let x = scrollX;
    x += Math.round(maxWidth / slides);
    if (x === maxWidth) return;
    setScrollX(x);
  };

  useEffect(() => {
    const magicNumber = 6;
    setRecommendedsRecipes(recommended.slice(0, magicNumber));
  }, [recommended]);

  const renderList = () => (
    <div className="recommendedArea-listarea">
      <div
        className="recommendedArea-list"
        style={
          {
            marginLeft: scrollX,
            width: recommendedsRecipes.length * 250,
          }
        }
      >
        {recommendedsRecipes.length > 0 && recommendedsRecipes.map((recipe, index) => (
          <div
            className="item"
            data-testid={ `${index}-recomendation-card` }
            key={ recipe.idDrink }
          >
            <img
              src={ recipe.strDrinkThumb }
              alt="foto da receita"
            />
            <p>{ recipe.strDrink }</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="recommendedArea">
      <div className="recommendedArea-left" onClick={ handleWithLeftArrowClick }>
        <NavigateBeforeIcon style={ { fontSize: 25 } } />
      </div>
      <div className="recommendedArea-right" onClick={ handleWithRightArrowClick }>
        <NavigateNextIcon style={ { fontSize: 25 } } />
      </div>

      { recommendedsRecipes !== undefined && renderList()}

    </section>
  );
};

export default HorizontalScrollMenu;
