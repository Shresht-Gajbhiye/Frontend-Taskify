import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiLock,
  FiShield,
  FiArrowRight,
  FiHash,
  FiEyeOff,
  FiDatabase,
} from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate();

  // Wake up backend server on initial load
  useEffect(() => {
    const pingServer = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/ping`);
        console.log("Server pinged successfully!");
      } catch (error) {
        console.error("Failed to ping server:", error);
      }
    };

    pingServer();
  }, []);

  return (
    <div className="min-h-[calc(100vh-76px)] bg-slate-950 flex items-center justify-center p-3 sm:p-6 relative overflow-hidden font-sans">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Background Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px] animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[128px] animate-pulse delay-1000"></div>

      <div className="max-w-lg w-full relative z-10">
        {/* Main Content Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[2rem] blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-10 text-center border border-slate-800">
            {/* Animated Logo */}
            <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/30 mb-6 rotate-3 hover:rotate-0 transition-transform duration-500">
              <FiLock className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
            </div>

            {/* Headings */}
            <h1 className="text-3xl sm:text-5xl font-black text-white mb-3 tracking-tight leading-tight">
              Fortified{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Security.
              </span>
            </h1>

            <h2 className="text-lg sm:text-xl font-bold text-slate-300 mb-4">
              Absolute Control.
            </h2>

            <p className="text-slate-400 mb-6 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              Your tasks are mathematically locked. Military-grade workspace
              where your data remains exclusively yours.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-6">
              {[
                { icon: FiHash, text: "AES-256 Encryption" },
                { icon: FiEyeOff, text: "Zero Plaintext DB" },
                { icon: FiDatabase, text: "Dynamic Cipher" },
                { icon: FiShield, text: "Bank-Grade Security" },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-slate-800/80 rounded-full text-xs sm:text-sm text-slate-300 border border-slate-700/50 hover:border-purple-500/50 hover:bg-slate-800 transition-all cursor-default"
                >
                  <Icon className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  {text}
                </span>
              ))}
            </div>

            {/* Security Info Badge */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 rounded-2xl p-4 sm:p-5 mb-6 border border-slate-700/50 text-left">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiShield className="w-5 sm:w-6 h-5 sm:h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-1.5">
                    Impenetrable Database Architecture
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Every headline and task is stored as meaningless noise. Even
                    in a database breach, your data remains 100% secure and
                    unreadable.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl py-4 font-bold text-base sm:text-lg hover:from-purple-500 hover:to-pink-500 hover:shadow-2xl hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              Access Encrypted Vault
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-slate-500 text-[10px] sm:text-xs mt-6 font-medium tracking-widest uppercase">
          🔐 Fortified by Advanced AES-256 Cryptography
        </p>
      </div>
    </div>
  );
};

export default Home;
