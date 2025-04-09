import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxStateHooks";
import { JSX } from "react";

export const ProtectedRoute = (element: JSX.Element) => {
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.user);
  const location = useLocation();

  return !isLoading && isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
