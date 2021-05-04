import React from 'react';
import { arrayOf, shape } from 'prop-types';
import '../styles/Card.css';
import { Link, useLocation, useParams } from 'react-router-dom';

function Card({ data }) {
  const { pathname } = useLocation();
  const params = useParams();

  const isInMainPage = !Object.keys(params).length;
  const category = () => {
    if (isInMainPage) return pathname.includes('comidas') ? 'Meal' : 'Drink';
    return pathname.includes('comidas') ? 'Drink' : 'Meal';
  };
  const cardDataTestID = () => {
    if (isInMainPage) return 'recipe-card';
    return 'recomendation-card';
  };
  const titleDataTestID = () => {
    if (isInMainPage) return 'recipe-name';
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
            key={ `${element[`str${category()}`]}${index}` }
          >
            <Link to={ `${pathname}/${element[`id${category()}`]}` }>
              <img
                alt={ `imagem de ${element.strMeal}` }
                data-testid={ `${index}-card-img` }
                src={ element[`str${category()}Thumb`] }
              />
              <p data-testid={ `${index}-${titleDataTestID()}` }>
                { element[`str${category()}`] }
              </p>
            </Link>
          </section>
        ))}
    </>
  );
}

Card.propTypes = {
  data: arrayOf(shape()),
}.isRequired;

export default Card;
