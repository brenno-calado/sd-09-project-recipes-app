import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Card from '../../components/card';
import Header from '../../components/header';
import Btn from '../../components/btn';
import Footer from '../../components/footer';
import Search from '../../components/search';
import { requestCategoriesMeals, requestMeals } from '../../services/api';
import './index.css';

class index extends Component {
  constructor(props) {
    super(props);
    this.setMeals = this.setMeals.bind(this);
    this.setLastFilter = this.setLastFilter.bind(this);
    this.setSearch = this.setSearch.bind(this);

    this.state = {
      meals: [],
      categories: [],
      lastFilter: '',
      statusSearch: false,
    };
  }

  componentDidMount() {
    requestMeals().then((response) => this.setMeals(response.meals));
    requestCategoriesMeals().then((response) => this.setCategories(response.meals));
  }

  setMeals(listMeals) {
    this.setState((state) => ({ ...state, meals: [...listMeals] }));
  }

  setCategories(listCategories) {
    this.setState((state) => ({ ...state, categories: [...listCategories] }));
  }

  setLastFilter(filter) {
    this.setState((state) => ({ ...state, lastFilter: filter }));
  }

  setSearch() {
    this.setState((state) => ({ ...state, statusSearch: !state.statusSearch }));
  }

  renderBtns() {
    const { categories, lastFilter } = this.state;
    const LIMIT_CATEGORY = 4;
    return (
      <div className="container-btns">
        <Btn
          category="All"
          setItems={ this.setMeals }
          type="meals"
          lastFilter={ lastFilter }
          setLastFilter={ this.setLastFilter }
        />
        {
          categories.reduce((arrayFinal, currentValue, indexItem) => {
            const { strCategory } = currentValue;
            if (indexItem <= LIMIT_CATEGORY) {
              arrayFinal.push(
                <Btn
                  key={ strCategory }
                  category={ strCategory }
                  setItems={ this.setMeals }
                  type="meals"
                  lastFilter={ lastFilter }
                  setLastFilter={ this.setLastFilter }
                />,
              );
            }
            return arrayFinal;
          }, [])
        }
      </div>
    );
  }

  renderCards() {
    const { meals } = this.state;
    const LIMIT_ITEMS = 11;
    return (
      <div className="container-cards">
        { meals.reduce((arrayFinal, currentValue, indexItem) => {
          const { strMealThumb, strMeal, idMeal } = currentValue;
          if (indexItem <= LIMIT_ITEMS) {
            arrayFinal.push(
              <Card
                key={ idMeal }
                image={ strMealThumb }
                name={ strMeal }
                id={ idMeal }
                type="comidas"
                indexCard={ indexItem }
              />,
            );
          }
          return arrayFinal;
        }, []) }
      </div>
    );
  }

  render() {
    const { statusSearch, meals } = this.state;
    if (meals.length === 1 && statusSearch) {
      return <Redirect to={ `/comidas/${meals[0].idMeal}` } />;
    }
    return (
      <div>
        <Header title="Comidas" setSearch={ this.setSearch } />
        {
          (statusSearch)
          && <Search
            setItems={ this.setMeals }
            type="meals"
          />
        }
        { this.renderBtns() }
        { (meals.length === 0) && <span>Carregando...</span> }
        { this.renderCards() }
        <Footer />
      </div>
    );
  }
}

export default index;
