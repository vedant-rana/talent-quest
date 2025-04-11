import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxStateHooks";
import { JSX } from "react";

export const ProtectedRoute = (
  element: JSX.Element,
  allowedRoles?: number[]
) => {
  const { isLoading, isAuthenticated, user } = useAppSelector(
    (state) => state.user
  );
  const location = useLocation();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role as number)) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return element;
};
