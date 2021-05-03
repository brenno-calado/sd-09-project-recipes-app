import { useEffect } from 'react';

const useCategory = (fetch, setResult) => {
  useEffect(() => {
    const getFetch = async () => {
      const fetchCategories = await fetch();
      setResult(fetchCategories);
    };
    getFetch();
  }, [fetch, setResult]);
};

export default useCategory;
