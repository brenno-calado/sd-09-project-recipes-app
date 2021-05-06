import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import { searchAction } from '../action/FoodAndDrinkAction';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.searchBarOpen = this.searchBarOpen.bind(this);
  }

  // componentDidMount() {
  //   const { setSearchBar } = this.props;
  //   setSearchBar(true);
  // }

  searchBarOpen() {
    const { setSearchBar, getSearchBoolean } = this.props;
    setSearchBar(getSearchBoolean);
  }

  render() {
    const { titleHeader, id, getSearchBoolean, type } = this.props;

    const headerComponent = () => {
      if (id === '0') {
        return (
          <header className="header">
            <div className="main-header">
              <Link to="/perfil">
                <img
                  alt="profile"
                  className="profile-btn"
                  data-testid="profile-top-btn"
                  src={ profileIcon }
                />
              </Link>
              <span
                data-testid="page-title"
                className="page-title"
              >
                { titleHeader }
              </span>
              <button
                type="button"
                className="search-btn"
                onClick={ this.searchBarOpen }
              >
                <img
                  alt="search"
                  className="search-image"
                  data-testid="search-top-btn"
                  src={ searchIcon }
                />
              </button>
            </div>
            { getSearchBoolean && <SearchBar type={ type } /> }
          </header>
        );
      }
      return (
        <header className="header">
          <div className="main-header">
            <Link to="/perfil">
              <img
                alt="profile"
                className="profile-btn"
                data-testid="profile-top-btn"
                src={ profileIcon }
              />
            </Link>
            <span
              data-testid="page-title"
              className="page-title"
            >
              { titleHeader }
            </span>
          </div>
        </header>
      );
    };

    return headerComponent();
  }
}

const mapStateToProps = (state) => ({
  getSearchBoolean: state.FoodAndDrinkReducer.searchBar,
});

const mapDispatchToProps = (dispatch) => ({
  setSearchBar: (boolean) => dispatch(searchAction(boolean)),
});

Header.propTypes = ({
  titleHeader: string,
  id: string,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
