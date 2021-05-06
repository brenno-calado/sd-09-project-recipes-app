import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import Footer from '../../components/footer';
import './styles.css';

class ExplorerScreen extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target }) {
    const { name } = target;
    const { history } = this.props;
    history.push(`/explorar/${name}`);
  }

  render() {
    return (
      <div className="explore-screen">
        <Header title="Explorar" iconSearch="hidden" />
        <button
          className="explore-screen-button"
          type="button"
          name="comidas"
          data-testid="explore-food"
          onClick={ this.handleClick }
        >
          Explorar Comidas
        </button>
        <button
          className="explore-screen-button"
          type="button"
          name="bebidas"
          data-testid="explore-drinks"
          onClick={ this.handleClick }
        >
          Explorar Bebidas
        </button>
        <Footer />      
      </div>
    );
  }
}

ExplorerScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExplorerScreen;
