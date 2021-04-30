import React, { Component } from 'react';
import PropTypes from 'prop-types';

class index extends Component {
  render() {
    const { videoId } = this.props;
    return (
      <div>
        <h3>Video</h3>
        <div className="recipe-video">
          <iframe
            data-testid="video"
            width="340"
            height="310"
            src={ `http://www.youtube.com/embed/${videoId.split('?v=')[1]}` }
            frameBorder="0"
            allow="autoplay; encrypted-media"
            title="Youtube-Video"
            allowFullScreen
          />
        </div>
      </div>
    );
  }
}

index.propTypes = {
  videoId: PropTypes.number.isRequired,
};

export default index;
