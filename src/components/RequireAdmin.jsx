import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const adminInfo = useSelector((state) => state.admin.adminInfo);
  const adminChecked = useSelector((state) => state.admin.adminChecked);
  const location = useLocation();

  if (!adminChecked) {
    return <div>Loading...</div>;
  }

  if (!adminInfo) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return children;
}
