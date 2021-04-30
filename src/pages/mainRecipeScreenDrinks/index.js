import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Card from '../../components/card';
import Header from '../../components/header';
import Btn from '../../components/btn';
import Footer from '../../components/footer';
import Search from '../../components/search';
import { requestCategoriesDrinks, requestDrinks } from '../../services/api';

class index extends Component {
  constructor(props) {
    super(props);
    this.setDrinks = this.setDrinks.bind(this);
    this.setLastFilter = this.setLastFilter.bind(this);
    this.setSearch = this.setSearch.bind(this);

    this.state = {
      drinks: [],
      categories: [],
      lastFilter: 'All',
      statusSearch: false,
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

  setSearch() {
    this.setState((state) => ({ ...state, statusSearch: !state.statusSearch }));
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
    const { statusSearch, drinks } = this.state;
    if (drinks.length === 1) return <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />;
    return (
      <div>
        <Header title="Bebidas" setSearch={ this.setSearch } />
        {
          (statusSearch)
          && <Search
            setItems={ this.setDrinks }
            type="drinks"
          />
        }
        { this.renderbtns() }
        { (drinks.length === 0) && <span>Carregando...</span> }
        { this.renderCards() }
        <Footer />
      </div>
    );
  }
}

export default index;
