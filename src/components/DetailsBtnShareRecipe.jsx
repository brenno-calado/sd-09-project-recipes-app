import React from 'react';
import './DetailsBtnShareRecipe.css';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function DetailsBtnShareRecipe() {
  function removeTextFromComponent(component) {
    const maxTimeToRemoveElement = 1500;
    setTimeout(() => {
      component.lastChild.innerText = '';
    }, maxTimeToRemoveElement);
  }

  async function handleClickCopy() {
    const tooltip = document.getElementById('myTooltip');
    await navigator.clipboard.writeText(window.location.href);
    tooltip.innerText = 'Link copiado!';
    removeTextFromComponent(tooltip.parentElement);
  }

  return (
    <div className="boxbtn">
      <Button
        data-testid="share-btn"
        type="button"
        color="primary"
        onClick={ handleClickCopy }
      >
        Share
      </Button>
      <span className="tooltiptext" id="myTooltip" />
    </div>
  );
}

DetailsBtnShareRecipe.propTypes = { detailsContext: PropTypes.object }.isRequired;

export default DetailsBtnShareRecipe;
