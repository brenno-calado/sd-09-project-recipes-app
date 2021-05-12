import '../styles/Details.css';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import { foodThunkAction } from '../action/FoodAndDrinkAction';
import FoodCard from './FoodCard';

class CarouselDrinkDetails extends React.Component {
  componentDidMount() {
    const {
      setFood,
      getFoodBoolean,
      getFoodName } = this.props;
    setFood('', getFoodBoolean, getFoodName);
  }

  createCard(numb1, numb2) {
    let magicNumber = numb1 - 1;
    const { getFood } = this.props;
    return (
      <div className="cardDetails">
        {getFood.slice(numb1, numb2).map((food) => {
          magicNumber += 1;
          return (
            <div key={ magicNumber } className="cardDtls">
              <FoodCard
                key={ `${food}${magicNumber}` }
                food={ food }
                index={ magicNumber }
                testid="-recomendation-card"
                nameId="-recomendation-title"
              />
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { getFood } = this.props;

    if (!getFood[0]) {
      return <p>Loading...</p>;
    }
    return (
      <Carousel fade>
        <Carousel.Item interval={ 7000 }>
          {this.createCard(0, 2)}
        </Carousel.Item>
        <Carousel.Item interval={ 7000 }>
          {this.createCard(2, Number('4'))}
        </Carousel.Item>
        <Carousel.Item interval={ 7000 }>
          {this.createCard(Number('4'), Number('6'))}
        </Carousel.Item>
      </Carousel>
    );
  }
}

const mapStateToProps = (state) => ({
  getFood: state.FoodAndDrinkReducer.food,
  getFoodkName: state.FoodAndDrinkReducer.foodName,
  getFoodBoolean: state.FoodAndDrinkReducer.foodBoolean,
});

const mapDispatchToProps = (dispatch) => ({
  setFood: (drink, drinkBoolean, drinkName) => dispatch(
    foodThunkAction(drink, drinkBoolean, drinkName),
  ),
});

CarouselDrinkDetails.propTypes = ({
  getFood: PropTypes.arrayOf(PropTypes.object),
  setFood: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(CarouselDrinkDetails);
