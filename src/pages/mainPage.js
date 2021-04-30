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
      filter: searchMeals,
      categories: categoriesMeals,
    },
    drinks: {
      all: listDrinks,
      filter: searchDrinks,
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

  const selectCategoryButton = async (value) => {
    if (value !== 'All' && value !== catSelected) {
      const fetch = await getFoodsAndDrinks(type, 'filterCategory', value);
      dispatch(fetchValues[type].filter(fetch));
    }

    setCatSelected(value);
  };

  const recipesData = useSelector((state) => {
    if (type) return state.recipesReducer[stateValues[type].all];
  });

  const searchData = useSelector((state) => {
    if (type && catSelected !== 'All') {
      return state.recipesReducer[stateValues[type].filter];
    }
  });

  const categoriesData = useSelector((state) => {
    if (type) return state.recipesReducer[stateValues[type].categories];
  });

  const searchFor = () => (pathname === '/comidas' ? 'meals' : 'drinks');

  useEffect(() => {
    setRecipes(catSelected === 'All' ? recipesData : searchData);
    setCategories(categoriesData);
  }, [catSelected, categoriesData, recipesData, searchData]);

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
        <CardContainer recipes={ recipes } path={ pathname } />
      </main>
      <Footer />
    </>
  );
}
