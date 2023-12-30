import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { AlignRight } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

const PrivatePages = () => {
  const { setIsSidebarOpen, isSidebarOpen } = useAuthContext();
  return (
    <>
      <button
        type="button"
        className="max-[400px]:block hidden absolute -left-0 top-40 bg-black/40 p-1 z-[10000] hover:"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <AlignRight />
      </button>
      <SideBar />
      <div className=" bg-[#212022] rounded-lg flex-1 p-6 overflow-auto custom-scrollbar">
        <Outlet />
      </div>
    </>
  );
};

export default PrivatePages;
