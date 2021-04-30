import { useLocation } from 'react-router-dom';

const usePathLocation = () => {
  const location = useLocation();
  const pathLocation = (location.pathname).split('/')[1];
  return [pathLocation];
};

export default usePathLocation;
