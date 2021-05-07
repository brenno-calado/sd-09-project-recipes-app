// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Carousel from 'react-multi-carousel';
// import { fetchMealsApi, fetchDrinksApi } from '../services/index';
// import 'react-multi-carousel/lib/styles.css';

// function RecommendedCarousel({ reference }) {
//   const [recommendedRecipes, setRecommendations] = useState([]);
//   const numberOfElements = 6;
//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       let recommendations = [];
//       if (reference === 'meals') recommendations = await fetchMealsApi();
//       if (reference === 'drinks') recommendations = await fetchDrinksApi();
//       return setRecommendations(recommendations.slice(0, numberOfElements));
//     };
//     fetchRecommendations();
//   }, [reference]);

//   const responsive = {
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 2,
//       slidesToSlide: 1, // optional, default to 1.
//     },
//   };

//   return (
//     <Carousel
//       swipeable
//       draggable={ false }
//       showDots
//       responsive={ responsive }
//       // ssr // means to render carousel on server-side.
//       infinite
//       autoPlaySpeed={ 1000 }
//       keyBoardControl
//       customTransition="all .5"
//       transitionDuration={ 500 }
//       containerClass="carousel-container"
//       removeArrowOnDeviceType={ ['tablet', 'mobile'] }
//       dotListClass="custom-dot-list-style"
//       itemClass="carousel-item-padding-40-px"
//     >
//       {
//         recommendedRecipes.map((item, index) => (
//           <div
//             key={ index }
//             className="recommended"
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
//         ))
//       }
//     </Carousel>
//   );
// }

// RecommendedCarousel.propTypes = {
//   reference: PropTypes.string.isRequired,
// };

// export default RecommendedCarousel;
