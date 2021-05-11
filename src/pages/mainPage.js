import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
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
  const [categories, setCategories] = useState();
  const [catSelected, setCatSelected] = useState('All');
  const [type, setType] = useState('');
  const [updated, setUpdated] = useState(false);
  const dispatch = useDispatch();

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
    state.recipesReducer.selectedIngredient
  ));
  console.log('listByIngredient', listByIngredient);

  const { pathname } = useLocation();
  const path = pathname.replace('/', '');
  console.log(path);

  useEffect(() => {
    if (path === 'comidas') {
      setType('meals');
      setUpdated(true);
    }
    if (path === 'bebidas') {
      setType('drinks');
      setUpdated(true);
    }
  }, [path]);

  useEffect(() => {
    let execFetch = false;
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

    const fetchFunction = async (exec, fetchParam, fetchValue, value) => {
      if (exec) {
        const fetch = await getFoodsAndDrinks(type, fetchParam, value);
        dispatch(fetchValues[type][fetchValue](fetch));
        execFetch = false;
      }
    };

    if (updated) {
      if (type && listByIngredient === '') {
        execFetch = true;
        if (catSelected === 'All') {
          fetchFunction(execFetch, 'getAll', 'all');
          setUpdated(false);
        } else {
          fetchFunction(execFetch, 'filterCategory', 'all', catSelected);
          setUpdated(false);
        }
        fetchFunction(execFetch, 'getByCategory', 'categories');
      }
      if (type && listByIngredient !== '') {
        execFetch = true;
        fetchFunction(execFetch, 'getIngredientByValue', 'all', listByIngredient);
        setUpdated(false);
      }
    }
    return () => {
      dispatch(getOneIngredient(''));
      dispatch(categoriesMeals([]));
      dispatch(categoriesDrinks([]));
    };
  }, [catSelected, dispatch, listByIngredient, type, updated]);

  const selectCategoryButton = async (value) => {
    if (value !== 'All' && value !== catSelected) {
      setCatSelected(value);
    } else {
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
  console.log('categories', categories);

  return (
    <>
      <Header
        page={ pathname.replace('/', '').charAt(0).toUpperCase() + pathname.slice(2) }
        search={ { searchBtn: true, searchFor: searchFor() } }
      />
      <main className="mainPage-wrapper">
        {(categories && categories.length > 0) && (
          <Categories
            categories={ categories }
            selected={ catSelected }
            callback={ selectCategoryButton }
          />
        )}
        <CardContainer recipes={ recipes } path={ pathname } cardType="recipes" />
      </main>
      <Footer />
    </>
  );
}
