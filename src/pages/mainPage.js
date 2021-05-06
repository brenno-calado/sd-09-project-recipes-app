import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  categoriesDrinks,
  categoriesMeals,
  listDrinks,
  listMeals,
  getOneIngredient,
} from '../actions';
import getFoodsAndDrinks from '../services/servicesAPI';

import Header from '../components/header';
import Footer from '../components/footer';
import CardContainer from '../components/cardContainer';
import Categories from '../components/categories';

export default function MainPageFood() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catSelected, setCatSelected] = useState('All');
  const [type, setType] = useState('');
  const dispatch = useDispatch();

  const fetchValues = {
    meals: {
      all: listMeals,
      categories: categoriesMeals,
    },
    drinks: {
      all: listDrinks,
      categories: categoriesDrinks,
    },
  };

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

  const listByIngredient = useSelector((state) => (
    state.recipesReducer.selectedIngredient));

  const fetchDispatch = async (fetchParam, fetchValue, value) => {
    const fetch = await getFoodsAndDrinks(type, fetchParam, value);
    dispatch(fetchValues[type][fetchValue](fetch));
  };

  const { pathname } = window.location;
  const path = pathname.replace('/', '');

  useEffect(() => {
    if (path === 'comidas') {
      setType('meals');
    }
    if (path === 'bebidas') {
      setType('drinks');
    }
  }, [path]);

  useEffect(() => {
    if (type && listByIngredient === '') {
      fetchDispatch('getAll', 'all');
      fetchDispatch('getByCategory', 'categories');
    }
    if (type && listByIngredient !== '') {
      fetchDispatch('getIngredientByValue', 'all', listByIngredient);
      fetchDispatch('getByCategory', 'categories');
    }
    return () => {
      dispatch(getOneIngredient(''));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const selectCategoryButton = async (value) => {
    if (value !== 'All' && value !== catSelected) {
      fetchDispatch('filterCategory', 'all', value);
      setCatSelected(value);
    } else {
      fetchDispatch('getAll', 'all');
      setCatSelected('All');
    }
  };

  const recipesData = useSelector((state) => {
    if (type) return state.recipesReducer[stateValues[type].all];
  });

  const categoriesData = useSelector((state) => {
    if (type) return state.recipesReducer[stateValues[type].categories];
  });

  const searchFor = () => (pathname === '/comidas' ? 'meals' : 'drinks');

  useEffect(() => {
    setRecipes(recipesData);
    setCategories(categoriesData);
  }, [catSelected, categoriesData, recipesData]);

  return (
    <>
      <Header
        page={ pathname.replace('/', '').charAt(0).toUpperCase() + pathname.slice(2) }
        search={ { searchBtn: true, searchFor: searchFor() } }
      />
      <main className="mainPage-wrapper">
        <Categories
          categories={ categories }
          selected={ catSelected }
          callback={ selectCategoryButton }
        />
        <CardContainer recipes={ recipes } path={ pathname } cardType="recipes" />
      </main>
      <Footer />
    </>
  );
}
