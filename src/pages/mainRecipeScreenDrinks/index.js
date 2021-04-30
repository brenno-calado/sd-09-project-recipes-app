import React, { Component } from 'react';
import Card from '../../components/card';
import Header from '../../components/header';
import Btn from '../../components/btn';
import Footer from '../../components/footer';
import { requestCategoriesDrinks, requestDrinks } from '../../services/api';

class index extends Component {
  constructor(props) {
    super(props);
    this.setDrinks = this.setDrinks.bind(this);
    this.setLastFilter = this.setLastFilter.bind(this);

    this.state = {
      drinks: [],
      categories: [],
      lastFilter: 'All',
    };
  }

  componentDidMount() {
    requestDrinks().then((response) => this.setDrinks(response.drinks));
    requestCategoriesDrinks().then((response) => this.setCategories(response.drinks));
  }

  setDrinks(listDrinks) {
    this.setState((state) => ({ ...state, drinks: listDrinks }));
  }

  setCategories(listCategories) {
    this.setState((state) => ({ ...state, categories: listCategories }));
  }

  setLastFilter(filter) {
    this.setState((state) => ({ ...state, lastFilter: filter }));
  }

  renderbtns() {
    const { categories, lastFilter } = this.state;
    const LIMIT_CATEGORY = 4;
    return (
      <div className="container-btns">
        <Btn
          category="All"
          setItems={ this.setDrinks }
          type="drinks"
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
                  setItems={ this.setDrinks }
                  type="drinks"
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
    const { drinks } = this.state;
    const LIMIT_ITEMS = 11;
    return (
      <div className="container-cards">
        { drinks.reduce((arrayFinal, currentValue, indexItem) => {
          const { strDrinkThumb, strDrink, idDrink } = currentValue;
          if (indexItem <= LIMIT_ITEMS) {
            arrayFinal.push(
              <Card
                key={ idDrink }
                image={ strDrinkThumb }
                name={ strDrink }
                id={ idDrink }
                type="bebidas"
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
        <Header title="Bebidas" />
        { this.renderbtns() }
        { this.renderCards() }
        <Footer />
      </div>
    );
  }
}

export default index;
