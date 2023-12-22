import { ReactNode } from "react";
import { Navigate } from "react-router";

import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps): ReactNode {
  const { user } = useAuth();
  // const location = useLocation();
  console.log(user);
  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
