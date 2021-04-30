import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import { getFoodDetailsById } from '../services/fetchApi';
// import CardDetails from '../components/CardDetails/index';

function FoodRecipeInProgress(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [isFetching, setIsFetching] = useState(false);
  const [apiData, setApiData] = useState();

  useEffect(() => {
    getFoodDetailsById(id)
      .then((items) => {
        setApiData(items);
        setIsFetching(true);
      });
  }, [id]);

  // function renderInProgressMeal() {
  //   return (
  //     apiData.meals && (
  //       apiData.meals.map(({
  //         strMealThumb,
  //         strMeal,
  //         strYoutube,
  //         strCategory,
  //         strInstructions,
  //         idMeal,
  //       }) => (
  //         <CardDetails

  //         />
  //       ))
  //     )
  //   );
  // }

  return (
    <p>render</p>
    //! isFetching ? <p>loading</p> : renderInProgressMeal()
  );
}

FoodRecipeInProgress.propTypes = {
  match: shape(),
  params: shape(),
  id: string,
};

FoodRecipeInProgress.defaultProps = {
  match: {},
  params: {},
  id: '',
};

export default FoodRecipeInProgress;
