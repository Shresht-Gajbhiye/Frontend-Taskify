import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyOtp,
  resendOtp,
  resetAuth,
} from "../../Redux/Features/AuthSlice";
import { toast } from "react-toastify";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth,
  );

  const email = location.state?.email;

  // Bina email ke access roko
  useEffect(() => {
    if (!email) navigate("/register");
  }, [email, navigate]);

  // Redux state updates handle karo (Success/Error Toasts)
  useEffect(() => {
    if (isError) {
      toast.error(message || "Something went wrong");
      dispatch(resetAuth());
    }

    if (isSuccess) {
      if (user) {
        toast.success("Account Verified Successfully! 🎉");
        navigate("/login");
      } else if (message) {
        toast.success(message || "OTP has been resent to your email!");
      }
      dispatch(resetAuth());
    }
  }, [isError, isSuccess, message, user, navigate, dispatch]);

  // OTP Submit Action
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      toast.error("Please enter a valid OTP");
      return;
    }
    dispatch(verifyOtp({ email, otp }));
  };

  // Resend OTP Action
  const handleResend = () => {
    if (!email) {
      toast.error("Email missing!");
      return;
    }
    dispatch(resendOtp({ email }));
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-transparent font-sans flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="w-full max-w-md relative group z-10 animate-fade-in-up">
        {/* Card Outer Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

        {/* Main Card */}
        <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <img
                src="https://res.cloudinary.com/dpvashxyn/image/upload/v1783110886/cropped_circle_image_1_uouaiw.png"
                alt="Logo"
                className="h-16 w-16 mx-auto rounded-full border-2 border-slate-700 hover:border-purple-500 transition-colors duration-300 shadow-lg shadow-purple-500/20 object-cover"
              />
            </Link>
            <h2 className="text-3xl font-black text-white/80 tracking-tight">
              Verify Email
            </h2>
            <p className="text-slate-400 mt-2 text-sm">
              We've sent a verification code to <br />
              <span className="text-purple-400 font-medium">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 text-center">
                Enter OTP Code
              </label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="••••••"
                maxLength={6}
                required
                className="w-full px-4 py-4 bg-slate-950/50 border border-slate-700 text-white text-center text-2xl tracking-widest rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 placeholder-slate-600"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify Account"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400 border-t border-slate-800 pt-6">
            <p>
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold hover:underline focus:outline-none ml-1"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
