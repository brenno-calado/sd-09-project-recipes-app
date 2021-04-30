import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import store from '../store/store';
import getFoodsAndDrinks from '../services/servicesAPI';
import { getRandomRecipe } from '../actions';

import Footer from '../components/footer';
import Header from '../components/header';

export default function ExploreFoodOrDrink() {
  const [redirect, setRedirect] = useState(false);
  const { recipesReducer: { randomRecipe } } = store.getState();
  const dispatch = useDispatch();
  const { pathname } = window.location;
  const varRota = pathname.split('/')[2];
  const typeOfID = varRota === 'comidas' ? 'idMeal' : 'idDrink';
  const typeOfSearch = varRota === 'comidas' ? 'meals' : 'drinks';

  const handleRandomExplore = async () => {
    const [generateRandom] = await getFoodsAndDrinks(typeOfSearch, 'getRandom');
    dispatch(getRandomRecipe(generateRandom));
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={ `/${varRota}/${randomRecipe[typeOfID]}` } />;
  }

  return (
    <>
      <Header page="Explorar" />
      <div className="exploreButton-wrapper">
        <Link to={ `${pathname}/ingredientes` }>
          <Button
            data-testid="explore-by-ingredient"
            variant="secondary"
            size="lg"
            block
          >
            Por Ingredientes
          </Button>
        </Link>
        { pathname !== '/explorar/bebidas' ? (
          <Link to={ `${pathname}/area` }>
            <Button
              data-testid="explore-by-area"
              variant="secondary"
              size="lg"
              block
            >
              Por Local de Origem
            </Button>
          </Link>
        ) : ''}
        <Button
          data-testid="explore-surprise"
          variant="secondary"
          onClick={ handleRandomExplore }
          size="lg"
          block
        >
          Me Surpreenda!
        </Button>
      </div>
      <Footer />
    </>
  );
}
