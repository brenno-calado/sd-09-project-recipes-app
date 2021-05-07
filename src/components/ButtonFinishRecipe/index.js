import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Style.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class index extends Component {
  render() {
    const { isFinished } = this.props;
    return (
      <Link to="/receitas-feitas">
        <button
          className="finish-recipe-btn"
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ !isFinished }
          onClick={ () => console.log('Teste') }
        >
          Finalizar Receita
        </button>
      </Link>
    );
  }
}

const mapStateToProps = (state) => ({
  isFinished: state.recipeData.isFinished,
});

index.propTypes = {
  isFinished: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(index);
