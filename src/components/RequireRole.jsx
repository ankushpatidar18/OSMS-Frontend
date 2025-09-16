import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireRole({ children, allowedRoles }) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const userChecked = useSelector((state) => state.user.userChecked);
  const location = useLocation();

  if (!userChecked) return null; 

  if (!userInfo || !userInfo.role || !allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
