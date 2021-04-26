import React from 'react';
import ProfileImage from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

const Header = () => {
  const title = 'Comida';
  return (
    <header
      style={ {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      } }
    >
      <div>
        <img src={ ProfileImage } alt="profileIcon" />
      </div>
      <h1>{ title }</h1>
      <div>
        <img src={ SearchIcon } alt="profileIcon" />
      </div>
    </header>
  );
};

export default Header;
