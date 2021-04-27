import React from 'react';
import styles from './headerFoods.module.css';

function HeaderFoods() {
  return (
    <header className={ styles.headerContainer }>
      <p data-testid="profile-top-btn">Profile</p>
      <h1 data-testid="page-title">Comidas</h1>
      <label htmlFor="searchBtn">
        <input
          type="text"
          id="searchBtn"
          data-testid="search-top-btn"
        />
      </label>
    </header>
  );
}

export default HeaderFoods;
