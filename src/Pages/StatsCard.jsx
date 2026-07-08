import { FiTarget, FiAward, FiClock } from "react-icons/fi";

// Component to display task statistics and a progress bar
const StatsCard = ({ tasks, done, progress }) => {
  // Configuration array for stat cards
  const stats = [
    {
      icon: FiTarget,
      label: "Total",
      value: tasks.length,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: FiAward,
      label: "Done",
      value: done,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      icon: FiClock,
      label: "Left",
      value: tasks.length - done,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {stats.map(({ icon: Icon, label, value, color, bg }) => (
          <div
            key={label}
            className={`${bg} rounded-xl p-3 text-center hover:scale-105 transition-transform`}
          >
            <Icon className={`w-4 h-4 ${color} mx-auto mb-1`} />
            <p className={`text-lg font-bold ${color}`}>{value}</p>
            <p className="text-[10px] text-gray-500 uppercase">{label}</p>
          </div>
        ))}
      </div>

      {/* Progress Bar Section */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>Progress</span>
          <span className="text-purple-400 font-medium">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700"
            style={{
              width: `${progress}%`,
              boxShadow: "0 0 15px rgba(168,85,247,0.3)",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default StatsCard;
