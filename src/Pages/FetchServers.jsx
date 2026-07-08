import React from "react";

const ServerLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-md px-4">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-72 w-72 rounded-full bg-blue-500/20 blur-[100px] animate-pulse"></div>
        <div
          className="absolute inset-0 h-72 w-72 rounded-full bg-purple-500/20 blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute inset-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative w-full max-w-sm rounded-2xl bg-white/10 backdrop-blur-xl p-8 text-center border border-white/20 shadow-2xl flex flex-col items-center hover:scale-[1.02] transition-transform duration-500">
        {/* Hover Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>

        <div className="mb-8 relative">
          {/* Outer Ring */}
          <div
            className="absolute -inset-2 h-24 w-24 rounded-full border-2 border-blue-500/30 animate-spin"
            style={{ animationDuration: "3s" }}
          ></div>

          {/* Inner Ring */}
          <div
            className="absolute -inset-1 h-22 w-22 rounded-full border-2 border-purple-500/30 animate-spin"
            style={{ animationDuration: "4s", animationDirection: "reverse" }}
          ></div>

          {/* Center Logo */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-400/30 shadow-lg shadow-blue-500/25">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 animate-pulse"></div>
            <img
              src="https://res.cloudinary.com/dpvashxyn/image/upload/v1783110886/cropped_circle_image_1_uouaiw.png"
              alt="Loading"
              className="h-10 w-10 relative z-10 animate-pulse object-cover rounded-full"
              style={{ animationDuration: "3s" }}
            />
          </div>
        </div>

        {/* Bouncing Dots */}
        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-1">
          Connecting To Servers
          <span className="inline-flex">
            <span className="animate-bounce" style={{ animationDelay: "0ms" }}>
              .
            </span>
            <span
              className="animate-bounce"
              style={{ animationDelay: "100ms" }}
            >
              .
            </span>
            <span
              className="animate-bounce"
              style={{ animationDelay: "200ms" }}
            >
              .
            </span>
          </span>
        </h3>

        <p className="text-sm text-gray-300/90 leading-relaxed mb-6">
          Please wait a moment while we establish a secure connection
        </p>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerLoader;
