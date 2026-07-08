import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import {
  loginUser,
  registerUser,
  resetAuth,
} from "../../Redux/Features/AuthSlice";
import { FiArrowLeft } from "react-icons/fi";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux se saari state nikal li
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  // Check if current route is login
  const isLogin = location.pathname === "/login";

  // Form & UI States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // Reset form when switching between Login and Register modes
  useEffect(() => {
    setFormData({ name: "", email: "", password: "" });
    setShowPassword(false);
  }, [isLogin]);

  // Redux API Status Monitor (Toast aur Navigation ke liye)
  useEffect(() => {
    if (isError) {
      toast.error(message || "Something went wrong. Please try again.");
      dispatch(resetAuth()); // Error dikhane ke baad state reset
    }

    if (isSuccess) {
      if (isLogin || user) {
        toast.success("Welcome back!");
        navigate("/mainPage");
      } else {
        toast.success(message || "OTP sent successfully!");
        navigate("/verify", { state: { email: formData.email } });
      }
      dispatch(resetAuth()); // Success ke baad state reset
    }
  }, [
    isError,
    isSuccess,
    user,
    message,
    isLogin,
    navigate,
    dispatch,
    formData.email,
  ]);

  // Delayed full-screen loader for better UX during long requests
  useEffect(() => {
    let timer;
    if (isLoading || isForgotLoading) {
      timer = setTimeout(() => {
        setShowLoader(true);
      }, 2200);
    } else {
      setShowLoader(false);
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [isLoading, isForgotLoading]);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission (Login/Register by Redux)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in your email and password.");
      return;
    }

    if (!isLogin && !formData.name) {
      toast.error("Please enter your full name to register.");
      return;
    }

    if (isLogin) {
      // Login Action Dispatch
      dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        }),
      );
    } else {
      // Register Action Dispatch
      dispatch(registerUser(formData));
    }
  };

  // Handle Forgot Password Routing
  const handleForgotPassword = () => {
    if (!formData.email) {
      toast.error("Please enter your email address first.");
      return;
    }
    navigate("/password-sent", { state: { email: formData.email } });
  };

  // Toggle mode
  const toggleAuthMode = () => {
    navigate(isLogin ? "/register" : "/login");
  };

  return (
    <>
      {/* Full Screen Loading Spinner */}
      {showLoader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="min-h-[calc(100vh-76px)] bg-transparent font-sans flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px] pointer-events-none"></div>

        <div className="w-full max-w-md relative group z-10">
          {/* Card Outer Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

          {/* Main Card */}
          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-6 sm:p-10 shadow-2xl">
            {/* Back Button */}
            <button
              onClick={() => navigate("/")}
              className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 bg-slate-800/50 border border-slate-700 rounded-full hover:bg-slate-800 hover:text-white transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
              title="Go to Home"
            >
              <FiArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back</span>
            </button>

            {/* Header Section */}
            <div className="text-center mb-8 mt-2">
              <Link to="/" className="inline-block mb-5">
                <img
                  src="https://res.cloudinary.com/dpvashxyn/image/upload/v1783110886/cropped_circle_image_1_uouaiw.png"
                  alt="Logo"
                  className="h-16 w-16 mx-auto rounded-full border-2 border-slate-700 hover:border-purple-500 transition-colors duration-300 shadow-lg shadow-purple-500/20 object-cover"
                />
              </Link>
              <h2 className="text-3xl font-black text-white/80 tracking-tight">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-slate-400 mt-2 text-sm">
                {isLogin
                  ? "Enter your credentials to access your vault."
                  : "Sign up to secure your workspace."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Full Name Input (Register Only) */}
              {!isLogin && (
                <div className="animate-fade-in-down">
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 placeholder-slate-600"
                  />
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 placeholder-slate-600"
                />
              </div>

              {/* Password Input */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-slate-300">
                    Password
                  </label>

                  {/* Forgot Password Link (Login Only) */}
                  {isLogin && (
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={isForgotLoading}
                      className={`text-xs font-medium transition-colors focus:outline-none ${
                        isForgotLoading
                          ? "text-slate-600 cursor-not-allowed"
                          : "text-purple-400 hover:text-pink-400 hover:underline"
                      }`}
                    >
                      {isForgotLoading ? "Sending..." : "Forgot Password?"}
                    </button>
                  )}
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-16 bg-slate-950/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 placeholder-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm font-medium text-slate-400 hover:text-purple-400 focus:outline-none transition-colors"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || isForgotLoading}
                className="w-full py-4 mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? "Please Wait..."
                  : isLogin
                    ? "Login"
                    : "Secure Account"}
              </button>
            </form>

            {/* Toggle Login/Register Footer */}
            <div className="mt-8 text-center text-sm text-slate-400 border-t border-slate-800 pt-6">
              <p>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold hover:underline focus:outline-none ml-1"
                >
                  {isLogin ? "Register here" : "Login instead"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
