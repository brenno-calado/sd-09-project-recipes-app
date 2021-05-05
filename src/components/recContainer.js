import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import PropTypes from 'prop-types';
import { CardGroup } from 'react-bootstrap';
import Recomended from './recommendedRecipes';

export default function CarouselContainer({ recipes, path }) {
  const four = 4;
  const six = 6;
  const itemOne = recipes.slice(0, 2);
  const itemTwo = recipes.slice(2, four);
  const itemThree = recipes.slice(four, six);
  const recipeMap = (recipeArray, sum) => recipeArray.map((item, index) => {
    const id = path === '/comidas' ? 'idMeal' : 'idDrink';
    const image = path === '/comidas' ? 'strMealThumb' : 'strDrinkThumb';
    const name = path === '/comidas' ? 'strMeal' : 'strDrink';
    return (<Recomended
      key={ index }
      url={ `${path}/${item[id]}` }
      index={ (index + sum) }
      image={ item[image] }
      name={ item[name] }
    />);
  });
  return (
    <div>
      {recipes && (
        <Carousel>
          <Carousel.Item>
            <CardGroup className="d-flex wrap">
              { recipeMap(itemOne, 0) }
            </CardGroup>
          </Carousel.Item>
          <Carousel.Item>
            <CardGroup className="d-flex wrap">
              { recipeMap(itemTwo, 2) }
            </CardGroup>
          </Carousel.Item>
          <Carousel.Item>
            <CardGroup className="d-flex wrap">
              { recipeMap(itemThree, four) }
            </CardGroup>
          </Carousel.Item>
        </Carousel>
      )}
    </div>
  );
}

CarouselContainer.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  path: PropTypes.string,
}.isRequired;
