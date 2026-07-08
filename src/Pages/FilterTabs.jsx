import { FiStar } from "react-icons/fi";

// Component to handle task filtering logic
const FilterTabs = ({ filter, onFilterChange }) => {
  return (
    <>
      {/* Priority Task Toggle Button */}
      <div className="mb-2">
        <button
          onClick={() =>
            onFilterChange(filter === "priority" ? "all" : "priority")
          }
          className={`w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all
            ${
              filter === "priority"
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-lg shadow-amber-500/10"
                : "bg-gray-800/50 text-gray-400 border border-gray-700/30 hover:bg-gray-800"
            }`}
        >
          <FiStar
            className={`w-4 h-4 ${filter === "priority" ? "fill-current" : ""}`}
          />
          Priority Tasks
        </button>
      </div>

      {/* Status Filter Tabs (All, Pending, Completed) */}
      <div className="flex gap-1 p-1 bg-gray-800/50 rounded-xl">
        {["all", "pending", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize transition-all
              ${filter === f ? "bg-purple-600 text-white shadow-md" : "text-gray-400 hover:bg-gray-700/50"}`}
          >
            {f}
          </button>
        ))}
      </div>
    </>
  );
};

export default FilterTabs;
