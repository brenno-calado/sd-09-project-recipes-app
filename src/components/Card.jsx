import React from 'react';
import { arrayOf, shape } from 'prop-types';
import '../styles/Card.css';
import { useLocation, useParams, useHistory } from 'react-router-dom';

function Card({ data }) {
  const { pathname } = useLocation();
  const params = useParams();
  const history = useHistory();

  const isInMainPage = !Object.keys(params).length;

  const category = () => {
    if (isInMainPage) {
      return pathname.includes('comidas')
        ? ['Meal', 'comidas'] : ['Drink', 'bebidas'];
    }
    return pathname.includes('comidas') ? ['Drink', 'bebidas'] : ['Meal', 'comidas'];
  };

  const cardDataTestID = () => {
    if (isInMainPage) return 'recipe-card';
    return 'recomendation-card';
  };

  const titleDataTestID = () => {
    if (isInMainPage) return 'card-name';
    return 'recomendation-title';
  };
  const DOZE = 12;

  return (
    <>
      { data
        .filter((_, index) => index < DOZE)
        .map((element, index) => (
          <section
            className="recipe-card"
            data-testid={ `${index}-${cardDataTestID()}` }
            key={ `${element[`str${category()[0]}`]}${index}` }
            onClick={
              () => history.push(`/${category()[1]}/${element[`id${category()[0]}`]}`)
            }
            role="link"
            aria-hidden="true"
          >
            <img
              alt={ `imagem de ${element.strMeal}` }
              data-testid={ `${index}-card-img` }
              src={ element[`str${category()[0]}Thumb`] }
              className="card__image"
            />
            <p data-testid={ `${index}-${titleDataTestID()}` }>
              { element[`str${category()[0]}`] }
            </p>

          </section>
        ))}
    </>
  );
}

Card.propTypes = {
  data: arrayOf(shape()),
}.isRequired;

export default Card;
