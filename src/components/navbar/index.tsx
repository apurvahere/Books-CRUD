import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProps } from "../../context/PropsContext";
import { FaBookOpen } from "react-icons/fa";

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const { setIsAuthenticated } = useProps();
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 px-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <span className="flex text-white text-4xl font-bold">
              <FaBookOpen /> <p className="ml-4 text-2xl">Book Store</p>
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-end">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <div>
                  {pathname.includes("/login") ||
                  pathname.includes("/register") ? (
                    pathname.includes("/login") ? (
                      <button
                        onClick={() => navigate("/register")}
                        className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Sign up
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/login")}
                        className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Log in
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => {
                        setIsAuthenticated(false);
                        navigate("/login");
                      }}
                      className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Log out
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
