import React, { useState, useEffect } from 'react';
import Carousel, { consts } from 'react-elastic-carousel';
// import {
//   CarouselProvider,
//   Slider,
//   Slide,
//   ButtonBack,
//   ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import PropTypes from 'prop-types';
import { fetchMealsApi, fetchDrinksApi } from '../services/index';

// import Carousel from './Carousel';

function RecommendedRecipes({ reference }) {
  const [recommendedRecipes, setRecommendations] = useState([]);
  // const [isFetching, setFetching] = useState(true);
  const numberOfElements = 6;
  // const type = reference;
  useEffect(() => {
    const fetchRecommendations = async () => {
      let recommendations = [];
      if (reference === 'meals') recommendations = await fetchMealsApi();
      if (reference === 'drinks') recommendations = await fetchDrinksApi();
      setFetching(false);
      return setRecommendations(recommendations.slice(0, numberOfElements));
    };
    fetchRecommendations();
  }, []);

  // const renderCarousel = () => (

  //   <CarouselProvider
  //     naturalSlideWidth={ 10 }
  //     naturalSlideHeight={ 10 }
  //     totalSlides={ 6 }
  //     infinite
  //     visibleSlides={ 2 }
  //   >
  //     <Slider>
  //       { recommendedRecipes.map((item, index) => (
  //         <Slide key={ index } index={ index }>
  //           <div
  //             data-testid={ `${index}-recomendation-card` }
  //           >
  //             <h3
  //               data-testid={ `${index}-recomendation-title` }
  //             >
  //               { item.strMeal || item.strDrink }
  //             </h3>
  //             <h4>{item.strCategory || item.strAlcoholic}</h4>
  //             <img src={ item.strMealThumb || item.strDrinkThumb } alt="Recipe" />
  //           </div>
  //         </Slide>
  //       ))}
  //     </Slider>
  //     <ButtonBack>Back</ButtonBack>
  //     <ButtonNext>Next</ButtonNext>
  //   </CarouselProvider>
  // );
  return (
    recommendedRecipes.length !== 0 ? <Carousel
      itemsToShow={ 2 }
      itemsToScroll={ 1 }
      itemPosition={ consts.CENTER }
    >
      {
        recommendedRecipes.map((item, index) => (
          <div
            key={ index }
            className="recommended"
            data-testid={ `${index}-recomendation-card` }
          >
            <h3
              data-testid={ `${index}-recomendation-title` }
            >
              { item.strMeal || item.strDrink }
            </h3>
            <h4>{item.strCategory || item.strAlcoholic}</h4>
            <img src={ item.strMealThumb || item.strDrinkThumb } alt="Recipe" />
          </div>
        ))
      }
    </Carousel>
      : <span>Loading...</span>
  // isFetching ? <span>Loading...</span> : renderCarousel()
  );
}

RecommendedRecipes.propTypes = {
  reference: PropTypes.string.isRequired,
};

export default RecommendedRecipes;
