immort React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';


function Header() {
    return (
        <header>
            <Link to="/perfil">
                <img
                    src={ profileIcon }
                    alt='Profile Icon Access'
                    data-testid='profile-top-btn'
                />
            </Link>
            <span data-testid='page-title'>Comidas</span>
            <Link>
                <img
                    src={ searchIcon }
                    alt='Search-Bar'
                    data-testid='search-top-btn'
                />
            </Link>
        </header>
    )
}