import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { objectOf } from 'prop-types';
import DetailsDrink from '../components/DetailsDrink';
import DetailsFood from '../components/DetailsFood';
import Loading from '../components/Loading';
import { fetchRecipeDetails } from '../services/fetchRecipes';
import './Styles/Details.css';

function Details({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [inProgressRecipes, setInProgressRecipes] = useState(false);
  const [done, setDone] = useState(false);
  const { pathname } = useLocation();
  const idType = (pathname.includes('comida')) ? 'meals' : 'cocktails';

  const checkInProgressStore = () => {
    let inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgress) return null;
    inProgress = inProgress[idType];
    inProgress = Object.keys(inProgress);
    setInProgressRecipes(inProgress.find((item) => item === id));
  };

  const checkDoneRecipie = () => {
    const isDone = localStorage.getItem('doneRecipes');
    if (isDone) {
      const isItDone = JSON.parse(isDone).some((item) => item.id === id);
      setDone(isItDone);
    }
  };

  useEffect(() => {
    fetchRecipeDetails(idType, id)
      .then((data) => {
        setRecipe(data);
        setLoading(false);
        checkInProgressStore();
        checkDoneRecipie();
      });
  }, [id, idType]);

  const handleClick = () => {
    const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!savedProgress) {
      const inProgress = { cocktails: {}, meals: {} };
      inProgress[idType] = {
        [id]: [],
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    } else {
      savedProgress[idType][id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(savedProgress));
    }
    setLoading(true);
  };

  return (
    <div>
      {loading && <Loading />}
      {!loading && idType === 'meals' && <DetailsFood
        recipe={ recipe }
        handleClick={ handleClick }
        inProgressRecipes={ inProgressRecipes }
        done={ done }
      />}
      {!loading && idType === 'cocktails' && <DetailsDrink
        recipe={ recipe }
        handleClick={ handleClick }
        inProgressRecipes={ inProgressRecipes }
        done={ done }
      />}
    </div>
  );
}

Details.propTypes = {
  match: objectOf(),
}.isRequired;

export default Details;
