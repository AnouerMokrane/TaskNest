import React from "react";

const GlobalSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className=" animate-pulse ease-linear rounded-full border-4 border-white h-12 w-12">
        <div className=" animate-spin rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export default GlobalSpinner;
