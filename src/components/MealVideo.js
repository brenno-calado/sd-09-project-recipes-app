import React from 'react';
import { string } from 'prop-types';
import { ResponsiveEmbed } from 'react-bootstrap';

export default function MealVideo({ code, title }) {
  return (
    <ResponsiveEmbed aspectRatio="16by9">
      <iframe
        data-testid="video"
        src={ `https://www.youtube.com/embed/${code}` }
        title={ title }
        frameBorder="0"
        allow="accelerometer; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </ResponsiveEmbed>
  );
}

MealVideo.propTypes = {
  code: string,
  title: string,
}.isRequired;
