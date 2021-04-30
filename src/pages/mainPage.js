import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  categoriesDrinks,
  categoriesMeals,
  listDrinks,
  listMeals,
  searchDrinks,
  searchMeals,
} from '../actions';
import CardContainer from '../components/cardContainer';
import Categories from '../components/categories';
import getFoodsAndDrinks from '../services/servicesAPI';

export default function MainPageFood() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catSelected, setCatSelected] = useState('All');
  const [type, setType] = useState('');
  const dispatch = useDispatch();

  const fetchValues = {
    meals: {
      all: listMeals,
      filter: searchMeals,
      categories: categoriesMeals,
    },
    drinks: {
      all: listDrinks,
      filter: searchDrinks,
      categories: categoriesDrinks,
    },
  };

  const { pathname } = window.location;
  const path = pathname.split('/');
  path.shift();

  useEffect(() => {
    if (path[0] === 'comidas') {
      setType('meals');
    }
    if (path[0] === 'bebidas') {
      setType('drinks');
    }
  }, [path]);

  useEffect(() => {
    if (type) {
      const dispatchFetchs = async () => {
        const fetch = await getFoodsAndDrinks(type, 'getAll');
        dispatch(fetchValues[type].all(fetch));

        const fetchCategories = await getFoodsAndDrinks(type, 'getByCategory');
        dispatch(fetchValues[type].categories(fetchCategories));
      };

      dispatchFetchs();
    }
  }, [type]);

  const stateValues = {
    meals: {
      all: 'meals',
      filter: 'searchedMeals',
      categories: 'categoriesMeals',
    },
    drinks: {
      all: 'drinks',
      filter: 'searchedDrinks',
      categories: 'categoriesDrinks',
    },
  };

  const recipesData = useSelector((state) => {
    if (type) {
      if (catSelected !== 'All') return state.recipesReducer[stateValues[type].filter];
      return state.recipesReducer[stateValues[type].all];
    }
  });

  const categoriesData = useSelector((state) => {
    if (type) return state.recipesReducer[stateValues[type].categories];
  });

  useEffect(() => {
    setRecipes(recipesData);
    setCategories(categoriesData);
  }, [categoriesData, recipesData]);

  return (
    <>
      <header className="header-wrapper">{pathname.replace('/', '')}</header>
      <main className="mainPage-wrapper">
        <Categories
          categories={ categories }
          selected={ catSelected }
          callback={ setType }
        />
        <CardContainer recipes={ recipes } path={ pathname } />
      </main>
      <footer className="footer-wrapper">Footer</footer>
    </>
  );
}
