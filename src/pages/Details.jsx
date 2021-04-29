import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import DetailsDrink from '../components/DetailsDrink';
import DetailsFood from '../components/DetailsFood';
import Loading from '../components/Loading';
import { fetchRecipeDetails } from '../services/fetchRecipes';

function Details({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const idType = (pathname.includes('comida')) ? 'idMeal' : 'idDrink';

  useEffect(() => {
    fetchRecipeDetails(idType, id)
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      });
  }, [id, idType]);

  return (
    <div>
      {loading && <Loading />}
      {!loading && idType === 'idMeal' && <DetailsFood recipe={ recipe } />}
      {!loading && idType === 'idDrink' && <DetailsDrink recipe={ recipe } />}
    </div>
  );
}

export default Details;
