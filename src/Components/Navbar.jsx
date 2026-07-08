import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { resetAuth, logoutUserThunk } from "../../Redux/Features/AuthSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, logoutSuccess, message } = useSelector((state) => state.auth);
  useEffect(() => {
    if (logoutSuccess) {
      toast.success(message);
      dispatch(resetAuth());
    }
  }, [logoutSuccess, message, dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
    navigate("/");
  };

  return (
    <nav className="bg-slate-950/80 backdrop-blur-xl px-4 sm:px-6 lg:px-10 py-3 sm:py-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
        <img
          src="https://res.cloudinary.com/dpvashxyn/image/upload/v1783110886/cropped_circle_image_1_uouaiw.png"
          alt="Taskify Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-slate-700 group-hover:border-purple-500 shadow-lg shadow-purple-500/10 transition-colors duration-300"
        />
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] tracking-tight">
          Taskify
        </h1>
      </Link>

      {/* Agar user hai toh Logout dikhao, nahi toh Login */}
      {user ? (
        <button
          onClick={handleLogout}
          className="px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 bg-slate-800/50 text-slate-300 border border-slate-700 rounded-xl font-semibold text-xs sm:text-sm lg:text-base hover:text-white hover:border-pink-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
          </svg>
          <span>Logout</span>
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-xs sm:text-sm lg:text-base hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          <span>Login</span>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
