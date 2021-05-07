// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Carousel from 'react-bootstrap/Carousel';
// import { fetchMealsApi, fetchDrinksApi } from '../services/index';

// function CarouselRecommendations({ reference }) {
//   const [recommendedRecipes, setRecommendations] = useState([]);
//   const [isFetching, setFetching] = useState(true);
//   const numberOfElements = 6;
//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       let recommendations = [];
//       if (reference === 'meals') recommendations = await fetchMealsApi();
//       if (reference === 'drinks') recommendations = await fetchDrinksApi();
//       setFetching(false);
//       return setRecommendations(recommendations.slice(0, numberOfElements));
//     };
//     fetchRecommendations();
//   }, [reference]);

//   const renderCarousel = () => (
//     <Carousel show={ 2 }>
//       { recommendedRecipes.map((item, index) => (
//         <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
//           <img
//             className="d-block w-100"
//             src={ item.strMealThumb || item.strDrinkThumb }
//             alt="Recipe"
//           />
//           <Carousel.Caption>
//             <h3 data-testid={ `${index}-recomendation-title` }>
//               { item.strMeal || item.strDrink }
//             </h3>
//             <h4>{item.strCategory || item.strAlcoholic}</h4>
//           </Carousel.Caption>
//         </Carousel.Item>
//       ))}
//     </Carousel>
//   );

//   return (
//     isFetching ? <span>Loading...</span> : renderCarousel()
//   );
// }

// Carousel.propTypes = {
//   reference: PropTypes.string.isRequired,
// };

// export default CarouselRecommendations;
