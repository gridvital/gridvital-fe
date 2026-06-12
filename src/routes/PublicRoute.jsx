import { Outlet } from "react-router-dom";

const PublicRoute = () => {

  // if (isAuthenticated) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return <Outlet />;
};

export default PublicRoute;
