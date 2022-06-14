import { FC, ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from 'services/hooks';
import { isAuth } from 'services/selectors/profile';
//--------------------------------------------------------------------------------

const RequireAuth: FC<{ children: ReactElement }> = ({ children }) => {
  const location = useLocation();
  const auth = useAppSelector(isAuth);

  return !auth ? <Navigate to="/login" state={{ from: location }} /> : children;
};

export default RequireAuth;
