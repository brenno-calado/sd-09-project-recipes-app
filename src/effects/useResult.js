import { useEffect } from 'react';

const useResult = (fetch, setResult) => {
  useEffect(() => {
    const getFetch = async () => {
      const fetchResult = await fetch();
      setResult(fetchResult);
    };
    getFetch();
  }, [fetch, setResult]);
};

export default useResult;
