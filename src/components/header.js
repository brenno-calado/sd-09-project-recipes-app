import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { string, shape, bool } from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';

import { Card } from 'react-bootstrap';
import SearchBar from './searchBar';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header({ page, search: { searchBtn, searchFor } }) {
  const [searchBar, setSearchBar] = useState(false);

  const handleSearch = () => {
    setSearchBar(!searchBar);
  };

  const returnCardHeader = () => (
    <Card.Header>
      <header
        className="header-Display"
      >
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="Profile"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1 data-testid="page-title">{ page }</h1>
        { searchBtn && (
          <Accordion.Toggle
            as="button"
            onClick={ handleSearch }
            variant="link"
            eventKey="0"
            className="header-searchBttn"
          >
            <img
              src={ searchIcon }
              alt="procurar"
              data-testid="search-top-btn"
            />
          </Accordion.Toggle>
        )}
      </header>
    </Card.Header>
  );

  return (
    <Accordion>
      <Card>
        {returnCardHeader()}
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            { searchBar && <SearchBar type={ searchFor } /> }
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

Header.propTypes = {
  page: string.isRequired,
  search: shape({
    searchBtn: bool,
    searchFor: string,
  }),
};

Header.defaultProps = {
  search: {
    searchBtn: false,
    searchFor: 'food',
  },
};

export default Header;
