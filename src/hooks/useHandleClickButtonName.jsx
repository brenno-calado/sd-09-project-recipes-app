import { useState } from 'react';

function useHandleClickButtonName() {
  const [checked, setChecked] = useState(false);
  const [category, setCategory] = useState();

  const handleClickButtonName = ({ target }, toggle) => {
    setCategory(target.name);
    setChecked(!checked);
    toggle();
  };
  return [handleClickButtonName, checked, category];
}

export default useHandleClickButtonName;
