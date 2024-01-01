import { AlertCircle, Check, Circle, Home, LogOut, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "../react-query/queriesAndMutations";
import { INITIAL_USER, useAuthContext } from "../context/AuthContext";
import React, { useEffect } from "react";

const SideBar = () => {
  const { user, setIsAuthenticated, setUser, isSidebarOpen } = useAuthContext();
  const { mutateAsync: logOut, isPending, isSuccess } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/sign-in");
    }
  }, [isSuccess]);

  return (
    <div
      className={`max-[400px]:absolute max-[400px]:border max-[400px]:h-3/5 max-[400px]:top-1/4  md:min-w-[200px] bg-[#212022] py-8 flex flex-col rounded-lg z-30 duration-300 ${
        isSidebarOpen
          ? "max-[400px]:-translate-x-4"
          : "max-[400px]:-translate-x-20"
      } `}
    >
      <div className="hidden md:flex flex-col gap-2 items-center px-8 ">
        <User className="w-20 h-20 rounded-full border-2" />
        <h3 className=" text-lg font-bold">{user.name} </h3>
      </div>
      <ul className="flex flex-col gap-2 flex-1 mt-16">
        <li>
          <NavLink
            className="nav-link flex gap-2 items-center w-full px-4 md:px-8 py-2 hover:bg-gray-600 hover:border-r-4 hover:border-green-600"
            to={"/"}
          >
            <Home width={20} />
            <span className="mt-1 hidden md:block">All tasks</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav-link flex gap-2 items-center w-full px-4 md:px-8 py-2 hover:bg-gray-600 hover:border-r-4 hover:border-r4 hover:border-green-600"
            to={"/completed"}
          >
            <Check width={20} />
            <span className="mt-1 hidden md:block">Completed</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav-link flex gap-2 items-center w-full px-4 md:px-8 py-2 hover:bg-gray-600 hover:border-r-4 hover:border-green-600"
            to={"/incompleted"}
          >
            <Circle width={20} />
            <span className="mt-1 hidden md:block">Incompleted</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav-link flex gap-2 items-center w-full px-4 md:px-8 py-2 hover:bg-gray-600 hover:border-r-4 hover:border-green-600"
            to={"/important"}
          >
            <AlertCircle width={20} />
            <span className="mt-1 hidden md:block">important</span>
          </NavLink>
        </li>
      </ul>
      <button
        className="flex gap-2 px-4 md:px-8"
        type="button"
        disabled={isPending}
        onClick={handleLogout}
      >
        <LogOut />
        <span className="hidden md:block">Log out</span>
      </button>
    </div>
  );
};

export default SideBar;
