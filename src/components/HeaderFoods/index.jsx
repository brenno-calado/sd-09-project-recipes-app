import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { shape, bool } from 'prop-types';
import styles from './headerFoods.module.css';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { useRecipeContext } from '../../contexts/recipeContext';

function HeaderFoods({ children, hassearchbar }) {
  const { handleChangeSearchBar } = useRecipeContext();
  const [redirect, setRedirect] = useState(false);

  function shouldRedirect() {
    setRedirect(true);
  }
  if (redirect) return <Redirect to="/perfil" />;
  return (
    <header className={ styles.headerContainer }>
      <button onClick={ shouldRedirect } type="button">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Ícone de perfil" />
      </button>

      <div data-testid="page-title">{children}</div>
      {hassearchbar && (
        <button onClick={ handleChangeSearchBar } type="button">
          <img data-testid="search-top-btn" src={ searchIcon } alt="Pesquisar" />
        </button>
      )}
    </header>
  );
}

HeaderFoods.propTypes = {
  children: shape(),
  hassearchbar: bool,
};

HeaderFoods.defaultProps = {
  children: [],
  hassearchbar: bool,
};
export default HeaderFoods;
