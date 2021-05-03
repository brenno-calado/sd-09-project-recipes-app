import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import '../css/HorizontalScrollMenu.css';

class HorizontalScrollMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: '',
      ArrowLeft: '',
      ArrowRight: '',
      selected: 'item1',
    };
    this.MenuItem = this.MenuItem.bind(this);
    this.Menu = this.Menu.bind(this);
    this.Arrow = this.Arrow.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.test = this.test.bind(this);
  }

  componentDidMount() {
    this.test();
  }

  onSelect(key) {
    this.setState({ selected: key });
  }

  test() {
    const { recommended } = this.props;
    const { selected } = this.state;
    this.setState({ menuItems: this.Menu(recommended, selected) });
    this.setState({ ArrowLeft: this.Arrow({ text: '<', className: 'arrow-prev' }) });
    this.setState({ ArrowRight: this.Arrow({ text: '>', className: 'arrow-next' }) });
  }

  MenuItem({ idMeal, strMealThumb, strMeal, selected, index }) {
    return (
      <div
        className={ `menu-item ${selected ? 'active' : ''}` }
        key={ idMeal }
        data-testid={ `${index}-recomendation-card` }
      >
        <img
          src={ strMealThumb }
          alt="foto da receita"
        />
        <p>{strMeal}</p>
      </div>);
  }

  Menu(list, selected) {
    return list.map((el, index) => {
      const { idMeal, strMealThumb, strMeal } = el;

      return (
        this.MenuItem({
          text: { strMeal },
          key: { idMeal },
          selected: { selected },
          img: { strMealThumb },
          index,
        })
      );
    });
  }

  Arrow({ text, className }) {
    return (
      <div
        className={ className }
      >
        {text}
      </div>
    );
  }

  render() {
    const { selected, menuItems, ArrowLeft, ArrowRight } = this.state;

    return (
      <div className="App">
        <ScrollMenu
          data={ menuItems }
          arrowLeft={ ArrowLeft }
          arrowRight={ ArrowRight }
          selected={ selected }
          onSelect={ this.onSelect }
        />
      </div>
    );
  }
}

export default HorizontalScrollMenu;
