import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import './Styles/Done.css';

function Done() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [copiedLink, setCopiedLink] = useState('');

  useEffect(() => {
    // const list = [
    //   {
    //     id: '52771',
    //     type: 'comida',
    //     area: 'Italian',
    //     category: 'Vegetarian',
    //     alcoholicOrNot: '',
    //     name: 'Spicy Arrabiata Penne',
    //     image:
    //       'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    //     doneDate: '23/06/2020',
    //     tags: ['Pasta', 'Curry'],
    //   },
    //   {
    //     id: '178319',
    //     type: 'bebida',
    //     area: '',
    //     category: 'Cocktail',
    //     alcoholicOrNot: 'Alcoholic',
    //     name: 'Aquamarine',
    //     image:
    //       'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    //     doneDate: '23/06/2020',
    //     tags: [],
    //   },
    // ];
    // localStorage.setItem('doneRecipes', JSON.stringify(list));
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipes) {
      setDoneRecipes(recipes);
      setFilteredRecipes(recipes);
    }
  }, []);

  const filter = ({ target: { name } }) => {
    const filtered = doneRecipes.filter((recipe) => recipe.type.includes(name));
    setFilteredRecipes(filtered);
  };

  const copyLink = async (id, type) => {
    const link = `http://localhost:3000/${type}s/${id}`;
    setCopiedLink(id);
    return navigator.clipboard.writeText(link);
  };

  return (
    <div className="Done-recipes">
      <Header title="Receitas Feitas" />
      <main>
        <section className="filters">
          <button
            className="filter"
            data-testid="filter-by-all-btn"
            type="button"
            name=""
            onClick={ filter }
          >
            All
          </button>
          <button
            className="filter"
            data-testid="filter-by-food-btn"
            type="button"
            name="comida"
            onClick={ filter }
          >
            Food
          </button>
          <button
            className="filter"
            data-testid="filter-by-drink-btn"
            type="button"
            name="bebida"
            onClick={ filter }
          >
            Drinks
          </button>
        </section>

        <section className="cards">
          {filteredRecipes.map((recipe, index) => (
            <div key={ index } className="Done-card">
              <span>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    className="image"
                    src={ recipe.image }
                    alt="Recipe"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
              </span>
              <span className="info">
                <div className="top-info">
                  <p
                    className="top-text"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.type === 'comida'
                      ? `${recipe.area} - ${recipe.category}`
                      : recipe.alcoholicOrNot}
                  </p>
                  <button
                    type="button"
                    onClick={ () => copyLink(recipe.id, recipe.type) }
                  >
                    <img
                      className="share-btn"
                      src={ shareIcon }
                      alt="Share"
                      data-testid={ `${index}-horizontal-share-btn` }
                    />
                  </button>
                  {recipe.id === copiedLink && (
                    <p className="copied-link">Link copiado!</p>
                  )}
                </div>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <h3 className="name" data-testid={ `${index}-horizontal-name` }>
                    {recipe.name}
                  </h3>
                </Link>
                <p
                  className="date"
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {`Feita em: ${recipe.doneDate}`}
                </p>
                {recipe.tags !== '' && (
                  <div className="tags">
                    {recipe.tags.slice(0, 2).map((tag, indexTags) => (
                      <span
                        className="tag"
                        key={ indexTags }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </span>
            </div>
          ))}
        </section>
      </main>
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
