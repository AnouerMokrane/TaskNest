import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const AuthLayout = () => {
  const { isAuthenticated } = useAuthContext();
  return (
    <>
      {isAuthenticated ? (
        <Navigate to={"/"} />
      ) : (
        <div className="w-full flex justify-center items-center">
          <Outlet />
        </div>
      )}
    </>
  );
};

export default AuthLayout;
