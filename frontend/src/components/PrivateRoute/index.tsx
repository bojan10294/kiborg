// src/components/PrivateRoute.tsx
import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';

const PrivateRoute: FC = () => {
  const { authTokens } = useAuthContext();
  const location = useLocation();

  return authTokens ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
