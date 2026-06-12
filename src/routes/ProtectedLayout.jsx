import { Outlet, useLocation } from "react-router-dom";

const ProtectedLayout = () => {
  useLocation();


  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
