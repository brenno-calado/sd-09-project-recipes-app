import React, { Component } from 'react';
import Header from '../../components/header';
import Card from '../../components/card';
import Footer from '../../components/footer';
import Search from '../../components/search';
import { requestAreaMeals, requestMeals, requestMealsByArea } from '../../services/api';
import './exploreByLocalOrigin.css';

class index extends Component {
  constructor(props) {
    super(props);

    this.setMeals = this.setMeals.bind(this);
    this.setLastFilter = this.setLastFilter.bind(this);
    this.setSearch = this.setSearch.bind(this);

    this.state = {
      meals: [],
      areas: [],
      lastFilter: 'All',
      statusSearch: false,
    };
  }

  componentDidMount() {
    requestMeals().then((response) => this.setMeals(response.meals));
    requestAreaMeals().then((response) => this.setAreas(response.meals));
  }

  setMeals(meals) {
    this.setState((state) => ({ ...state, meals }));
  }

  setAreas(areas) {
    this.setState((state) => ({ ...state, areas }));
  }

  setFilterByArea(area) {
    if (area === 'All') requestMeals().then((response) => this.setMeals(response.meals));
    else requestMealsByArea(area).then((response) => this.setMeals(response.meals));
  }

  setLastFilter(filter) {
    this.setState((state) => ({ ...state, lastFilter: filter }));
  }

  setSearch() {
    this.setState((state) => ({ ...state, statusSearch: !state.statusSearch }));
  }

  renderSelect() {
    const { areas } = this.state;
    return (
      <div className="container-select-exploreArea">
        <select
          className="select-exploreArea"
          data-testid="explore-by-area-dropdown"
          onChange={ (evt) => this.setFilterByArea(evt.target.value) }
        >
          <option value="All" data-testid="All-option">All</option>
          {
            areas.map((area) => (
              <option
                value={ area.strArea }
                data-testid={ `${area.strArea}-option` }
                key={ area.strArea }
              >
                { area.strArea }
              </option>
            ))
          }
        </select>
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
    const { statusSearch } = this.state;
    return (
      <div className="container-exploreArea">
        <Header title="Explorar Origem" setSearch={ this.setSearch } />
        {
          (statusSearch)
          && <Search
            setItems={ this.setMeals }
            type="foods"
          />
        }
        { this.renderSelect() }
        { this.renderCards() }
        <Footer />
      </div>
    );
  }
}

export default index;
