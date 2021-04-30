import { useState } from 'react';

function useShouldRedirect() {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  function handleClickRedirect() {
    setShouldRedirect(true);
  }
  return [handleClickRedirect, shouldRedirect];
}

export default useShouldRedirect;
