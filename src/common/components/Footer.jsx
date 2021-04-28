import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({

    button: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },

    footer: {
      bottom: 0,
      justifyContent: 'space-around',
      display: 'flex',
      position: 'fixed',
    },
  }));

const Footer = (props) => {

  const classes = useStyles(props);

  return (
    <>
      <footer
        data-testid="footer"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100%',
          color: 'white',
        }}
      >
        <button
          className={classes.button}
          >
          <Link to="/bebidas">
            <img
              data-testid="drinks-bottom-btn"
              src={ drinkIcon }
            />
          </Link>
        </button>
        <button
          className={classes.button}
          >
          <Link to="/explorar">
            <img
              data-testid="explore-bottom-btn"
              src={ exploreIcon }
            />
          </Link>
        </button>
        <button
          className={classes.button}
          >
          <Link to="/comidas">
            <img
              data-testid="food-bottom-btn"
              src={ mealIcon }
            />
          </Link>
        </button>
      </footer>
    </>
  );
}

export default Footer;
