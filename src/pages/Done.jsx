import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function Done() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const list = [
      {
        id: '52771',
        type: 'comida',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image:
          'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'bebida',
        area: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image:
          'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(list));
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));

    setDoneRecipes(recipes);
    setFilteredRecipes(recipes);
  }, []);

  const filter = ({ target: { name } }) => {
    const filtered = doneRecipes.filter((recipe) => recipe.type.includes(name));
    setFilteredRecipes(filtered);
  };

  return (
    <div>
      <Header title="Receitas Feitas" />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          name=""
          onClick={ filter }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          name="comida"
          onClick={ filter }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          name="bebida"
          onClick={ filter }
        >
          Drinks
        </button>
      </div>
      {filteredRecipes.map((recipe, index) => (
        <div key={ index }>
          <span>
            <img
              src={ recipe.image }
              alt="Recipe"
              data-testid={ `${index}-horizontal-image` }
            />
          </span>
          <span>
            <div>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.type === 'comida'
                  ? `${recipe.area} - ${recipe.category}`
                  : recipe.alcoholicOrNot}
              </p>
              <img
                src={ shareIcon }
                alt="Share"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </div>
            <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {`Feita em: ${recipe.doneDate}`}
            </p>
            {recipe.tags.slice(0, 2).map((tag, indexTags) => (
              <span
                key={ indexTags }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Done;

// {
//   id: 'id-da-receita',
//   type: 'comida',
//   area: 'area-da-receita-ou-texto-vazio',
//   category: 'categoria-da-receita-ou-texto-vazio',
//   alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
//   name: 'nome-da-receita',
//   image: 'imagem-da-receita',
//   doneDate: 'quando-a-receita-foi-concluida',
//   tags: 'array-de-tags-da-receita-ou-array-vazio',
// },
