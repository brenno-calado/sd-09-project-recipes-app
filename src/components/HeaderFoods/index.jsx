import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { shape, bool } from 'prop-types';
import styles from './headerFoods.module.css';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { useRecipeContext } from '../../contexts/recipeContext';

function HeaderFoods({ children, hasSearchBar }) {
  const { handleChangeSearchBar } = useRecipeContext();
  const [redirect, setRedirect] = useState(false);

  function shouldRedirect() {
    setRedirect(true);
  }
  if (redirect) return <Redirect to="/perfil" />;
  return (
    <header className={ styles.headerContainer }>
      <button
        onClick={ shouldRedirect }
        type="button"
        className={ styles.headerBtn }
      >
        <img
          className={ styles.svg }
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Ícone de perfil"
        />
      </button>

      <div data-testid="page-title">{children}</div>
      {hasSearchBar && (
        <button
          onClick={ handleChangeSearchBar }
          type="button"
          className={ styles.headerBtn }
        >
          <img
            className={ styles.svg }
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Pesquisar"
          />
        </button>
      )}
    </header>
  );
}

HeaderFoods.propTypes = {
  children: shape(),
  hasSearchBar: bool,
};

HeaderFoods.defaultProps = {
  children: [],
  hasSearchBar: bool,
};
export default HeaderFoods;
