// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { saveMealAsFavorite } from '../services/recipes';
// // import { fetchMealsById } from '../services/index';

// import blackHeartIcon from '../images/blackHeartIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import shareIcon from '../images/shareIcon.svg';

// function LikeAndShareButtons() {
//   const [isFavorite, setFavorite] = useState(false);
//   const [urlCopied, setUrlCopied] = useState('');
//   // const [currentMeal, setCurrentMeal] = useState({});

//   const recipeId = useParams();

//   useEffect(() => {
//     const checkFavorites = (id) => {
//       const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
//       if (favoriteRecipes.some((recipe) => recipe.id === id)) setFavorite(true);
//     };
//     checkFavorites(recipeId.id);
//   }, []);

//   const saveAsFavorite = () => {
//     setFavorite(!isFavorite);
//     // saveMealAsFavorite(recipeId.id, currentMeal);
//   };

//   const onCopyText = () => {
//     const timeout = 1000;
//     setUrlCopied('Link copiado!');
//     setTimeout(() => {
//       setUrlCopied('');
//     }, timeout);
//   };

//   const copyToClipBoard = async () => {
//     onCopyText();
//     await navigator.clipboard
//       .writeText(`http://localhost:3000/comidas/${recipeId.id}`);
//   };

//   return (
//     <div id="shareAndFavorite">
//       <button
//         type="button"
//         data-testid="share-btn"
//         onClick={ () => copyToClipBoard() }
//       >
//         <img src={ shareIcon } alt="compartilhar" />
//       </button>
//       <button
//         type="button"
//         onClick={ () => saveAsFavorite() }
//       >
//         <img
//           data-testid="favorite-btn"
//           src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
//           alt="Favorite"
//         />
//       </button>
//       <span>{ urlCopied }</span>
//       <LikeAndShareButtons />
//     </div>
//   );
// }

// export default LikeAndShareButtons;
