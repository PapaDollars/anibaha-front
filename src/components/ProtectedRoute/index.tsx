import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { ROUTES } from '@/utils/url/url_frontend';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireCompany?: boolean;
  requireSuperAdmin?: boolean;
  redirectUnauthenticatedTo?: string;
  redirectUnauthorizedTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireCompany = false,
  requireSuperAdmin = false,
  redirectUnauthenticatedTo = ROUTES.PUBLIC.AUTH.LOGIN,
  redirectUnauthorizedTo = ROUTES.PUBLIC.HOME
}) => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={redirectUnauthenticatedTo} state={{ from: location }} replace />;
  }

  if (requireSuperAdmin && user?.role !== 'super_admin') {
    return <Navigate to={redirectUnauthorizedTo} replace />;
  }

  if (requireCompany && !['company_admin', 'super_admin'].includes(user?.role || '')) {
    return <Navigate to={redirectUnauthorizedTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;