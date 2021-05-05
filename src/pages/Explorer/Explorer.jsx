import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';

function Explorer({ history }) {
  function redirectExplorer(type) {
    history.push(`/explorar/${type}`);
  }

  return (
    <div>
      <Header title="Explorar" isSearchEnable={ false } />
      <button
        type="button"
        data-testid="explore-food"
        onClick={ () => redirectExplorer('comidas') }
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => redirectExplorer('bebidas') }
      >
        Explorar Bebidas
      </button>
      <Footer />
    </div>
  );
}

Explorer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Explorer;
