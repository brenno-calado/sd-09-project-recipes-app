import { useState } from 'react';

function useHandleClickButtonName() {
  const [category, setCategory] = useState('');

  const handleClickButtonName = ({ target }) => {
    setCategory(target.name);
    if (category === target.name) {
      setCategory('');
    }
  };
  return [handleClickButtonName, category];
}

export default useHandleClickButtonName;
