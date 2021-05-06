import React from 'react';
import { objectOf, string } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

class DetailsHeader extends React.Component {
  render() {
    const { recipe, path } = this.props;
    const query = path.includes('comidas') ? 'Meal' : 'Drink';

    return (
      <div>
        <img
          src={ recipe[`str${query}Thumb`] }
          alt={ recipe[`str${query}`] }
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{recipe[`str${query}`]}</h1>
        {recipe.strAlcoholic
          ? <h3 data-testid="recipe-category">Alcoholic</h3>
          : <h3 data-testid="recipe-category">{recipe.strCategory}</h3>}
        <img src={ shareIcon } alt="Shere-Icon" data-testid="share-btn" />
        <img src={ whiteHeart } alt="white-Heart" data-testid="favorite-btn" />
      </div>
    );
  }
}

DetailsHeader.propTypes = {
  recipe: objectOf,
  path: string,
}.isRequired;

export default DetailsHeader;
