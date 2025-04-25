import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  blockedRoles?: string[]; // 🔥 List of roles to block for this route
}

const PrivateRoute = ({ children, blockedRoles = [] }: PrivateRouteProps) => {
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  if (!user) {
    return <Navigate to="/"  />; // Not logged in
  }

  if (blockedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />; // Block if role is in blockedRoles
  }

  return <>{children}</>;
};

export default PrivateRoute;
