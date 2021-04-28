import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { string, bool } from 'prop-types';
import { searchBar } from '../Redux/actions';
import './Header.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import Loading from './Loading';

function Header(props) {
  const { title, searchBtn = false, search, showSearchBar, loading } = props;
  const renderSearchButton = () => (
    <button
      type="button"
      data-testid="search-top-btn"
      src="../images/searchIcon.svg"
      onClick={ showSearchBar }
    >
      <img src={ searchIcon } alt="search" />
    </button>
  );

  const renderHeader = () => (
    <header className="Header">
      <Link to="/perfil">
        <button
          type="button"
          data-testid="profile-top-btn"
          src="../images/profileIcon.svg"
        >
          <img src={ profileIcon } alt="profile" />
        </button>
      </Link>
      <h3 data-testid="page-title">{ title }</h3>
      {searchBtn && renderSearchButton()}
    </header>
  );

  return (
    <div>
      {renderHeader()}
      {search && <SearchBar />}
      {loading && <Loading />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  search: state.searchBar.search,
  loading: state.searchBar.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  showSearchBar: () => dispatch(searchBar()),
});

Header.propTypes = {
  title: string,
  searchBtn: bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
