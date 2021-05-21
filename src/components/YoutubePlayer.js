import React from 'react';
import { string } from 'prop-types';
import '../css/YoutubePlayer.css';

function YoutubePlayer({ url, title }) {
  return (
    <section className="wrapper-video">
      <h3 className="title-section">Vídeo</h3>
      <iframe
        data-testid="video"
        width="100%"
        height="200"
        title={ title }
        src={ url && `https://www.youtube.com/embed/${url.split('=')[1]}` }
        frameBorder="0"
        allow="accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture"
        allowFullScreen
      />
    </section>
  );
}

YoutubePlayer.propTypes = { url: string, title: string }.isRequired;

export default YoutubePlayer;
