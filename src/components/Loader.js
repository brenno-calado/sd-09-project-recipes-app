import React from 'react';
import LoaderGif from '../images/preloader.gif';

class Loader extends React.Component {
  render() {
    return (
      <div className="loader-container">
        <img
          src={ LoaderGif }
          alt="Loader"
        />
      </div>
    );
  }
}

export default Loader;
