import { useState } from 'react';

function useHandleClickUrl() {
  const [copyUrl, setCopyUrl] = useState('');

  function handleClickUrl() {
    setCopyUrl('Link copiado!');
  }
  return [copyUrl, handleClickUrl];
}

export default useHandleClickUrl;
