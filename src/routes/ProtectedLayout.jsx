import { Outlet, useLocation } from "react-router-dom";

const ProtectedLayout = () => {
  const { pathname } = useLocation();


  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
