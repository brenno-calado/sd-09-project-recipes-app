import React from 'react';
import Lottie from 'react-lottie';
import NotFoundAnimated from '../images/lf20_dzWAyu.json';

function NotFound() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: NotFoundAnimated,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <Lottie
        className="animates"
        options={ defaultOptions }
        height={ 200 }
        width={ 200 }
      />
    </div>
  );
}

export default NotFound;
