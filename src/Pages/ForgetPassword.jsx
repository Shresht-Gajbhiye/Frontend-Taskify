import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";

const PasswordSent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  // Process states: "sending_otp", "otp_sent", "success", "error"
  const [status, setStatus] = useState("sending_otp");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
  });

  const apiCalled = useRef(false);
  const API_URL = import.meta.env.VITE_API_URL;

  // Step 1: Auto-send OTP on load
  useEffect(() => {
    if (!email) {
      navigate("/login");
      return;
    }

    const sendOtpRequest = async () => {
      if (apiCalled.current) return;
      apiCalled.current = true;

      try {
        await axios.post(`${API_URL}/api/auth/Forget-Password-verify`, {
          email: email,
        });

        setStatus("otp_sent");
        toast.success("OTP sent to your email!");
      } catch (error) {
        setStatus("error");
        setErrorMessage(
          error.response?.data?.message ||
            "Something went wrong while sending OTP.",
        );
        toast.error("Failed to send OTP");
      }
    };

    sendOtpRequest();
  }, [email, navigate, API_URL]);

  // Step 2: Handle password reset form
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (formData.otp.length !== 6) {
      return toast.warning("Please enter a valid 6-digit OTP");
    }
    if (formData.newPassword.length < 6) {
      return toast.warning("Password must be at least 6 characters long");
    }

    try {
      setIsSubmitting(true);

      await axios.post(`${API_URL}/api/auth/Reset-Password`, {
        email: email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });

      setStatus("success");
      toast.success("Password reset successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid OTP or request failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
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
            onClick={() => navigate("/login")}
            className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 bg-slate-800/50 border border-slate-700 rounded-full hover:bg-slate-800 hover:text-white transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
            title="Go back to Login"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Logo Section */}
          <div className="text-center mb-8 mt-2">
            <div className="inline-block mb-5">
              <img
                src="https://res.cloudinary.com/dpvashxyn/image/upload/v1783110886/cropped_circle_image_1_uouaiw.png"
                alt="Logo"
                className="h-16 w-16 mx-auto rounded-full border-2 border-slate-700 hover:border-purple-500 transition-colors duration-300 shadow-lg shadow-purple-500/20"
              />
            </div>
          </div>

          {/* STATE 1: Sending OTP */}
          {status === "sending_otp" && (
            <div className="animate-fade-in transition-opacity duration-500 text-center">
              <div className="relative w-16 h-16 mx-auto mb-6">
                <div className="absolute inset-0 border-t-2 border-purple-500 border-opacity-20 rounded-full"></div>
                <div className="absolute inset-0 border-t-2 border-purple-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 border-r-2 border-pink-500 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
              </div>
              <h2 className="text-2xl font-black text-white/80 tracking-tight mb-2">
                Initiating Reset...
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Generating and sending a secure OTP to your registered email.
              </p>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-950/50 border border-slate-800 text-slate-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse mr-2"></span>
                {email}
              </div>
            </div>
          )}

          {/* STATE 2: OTP Form */}
          {status === "otp_sent" && (
            <div className="animate-fade-in-down">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-black text-white/80 tracking-tight mb-2">
                  Verification Required
                </h2>
                <p className="text-slate-400 text-sm">
                  We've sent a 6-digit verification code to{" "}
                  <span className="text-purple-400 font-medium">{email}</span>.
                </p>
              </div>

              <form
                onSubmit={handleResetPassword}
                className="space-y-5"
                noValidate
              >
                {/* OTP Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Secure OTP
                  </label>
                  <input
                    type="text"
                    name="otp"
                    maxLength="6"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="Enter 6-digit code"
                    required
                    className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 text-center tracking-[0.5em] text-lg font-mono placeholder:tracking-normal placeholder:text-sm placeholder-slate-600"
                  />
                </div>

                {/* New Password Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      required
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
                  disabled={isSubmitting}
                  className="w-full py-4 mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Verifying..." : "Reset Password"}
                </button>
              </form>
            </div>
          )}

          {/* STATE 3: Success */}
          {status === "success" && (
            <div className="animate-fade-in-down text-center">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20 shadow-lg shadow-green-500/10 relative">
                <svg
                  className="w-10 h-10 text-green-400 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>

              <h2 className="text-3xl font-black text-white/80 tracking-tight mb-2">
                Password Updated
              </h2>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Your password has been successfully reset. You can now use your
                new credentials to log in.
              </p>

              <Link
                to="/login"
                className="block w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Return to Login
              </Link>
            </div>
          )}

          {/* STATE 4: Error */}
          {status === "error" && (
            <div className="animate-fade-in-up text-center">
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20 shadow-lg shadow-red-500/10">
                <svg
                  className="w-10 h-10 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>

              <h2 className="text-3xl font-black text-white/80 tracking-tight mb-2">
                Request Failed
              </h2>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                {errorMessage ||
                  "We could not process your request. Please ensure the email is correct and try again."}
              </p>

              <Link
                to="/login"
                className="block w-full py-4 bg-slate-800 text-slate-300 font-bold text-lg rounded-xl hover:bg-slate-700 hover:text-white transition-all duration-300 border border-slate-700"
              >
                Go Back
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordSent;
