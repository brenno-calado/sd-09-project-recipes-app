import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

class ExploreDrinkByIng extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     ingredients: {},
  //   };
  // }

  // componentDidMount() {
  //   fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
  //   .then(res => res.json())
  //   .then(result => this.setState({ ingredients: result }));
  // }

  render() {
    return (
      <div>
        <Header name="Explorar Ingredientes" />
        <h1>comida</h1>
        <Footer />
      </div>
    );
  }
}

export default ExploreDrinkByIng;
