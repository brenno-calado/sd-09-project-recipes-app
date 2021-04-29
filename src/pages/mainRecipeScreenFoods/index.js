import React, { Component } from 'react';
import Card from '../../components/card';
import Header from '../../components/header';
import Btn from '../../components/btn';
import Footer from '../../components/footer';
import { requestCategoriesMeals, requestMeals } from '../../services/api';
import './index.css';

class index extends Component {
  constructor(props) {
    super(props);
    this.setMeals = this.setMeals.bind(this);
    this.setLastFilter = this.setLastFilter.bind(this);
    this.state = {
      meals: [],
      categories: [],
      lastFilter: 'All',
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
    return (
      <div>
        <Header title="Comidas" />
        { this.renderBtns() }
        { this.renderCards() }
        <Footer />
      </div>
    );
  }
}

export default index;
