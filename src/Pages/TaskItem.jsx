import {
  FiEdit,
  FiCheck,
  FiRotateCcw,
  FiChevronDown,
  FiStar,
} from "react-icons/fi";

const TaskItem = ({
  task,
  isExpanded,
  onToggleExpand,
  onToggleTask,
  onTogglePriority,
  onEdit,
}) => {
  return (
    <div
      onClick={() => onToggleExpand(task._id)}
      className="bg-gray-900/40 backdrop-blur-sm rounded-xl border transition-all hover:scale-[1.01] cursor-pointer p-3 sm:p-4"
      style={{
        borderColor: isExpanded
          ? "rgba(168,85,247,0.5)"
          : task.isCompleted
            ? "rgba(75,85,99,0.2)"
            : task.isPriority
              ? "rgba(251,191,36,0.5)"
              : "rgba(75,85,99,0.5)",
        boxShadow:
          !task.isCompleted && task.isPriority
            ? "0 0 15px rgba(251,191,36,0.1)"
            : "none",
      }}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Priority Star (Only for pending tasks) */}
        {!task.isCompleted && task.isPriority && (
          <FiStar className="w-4 h-4 text-amber-400 fill-current flex-shrink-0 animate-pulse" />
        )}

        {/* Expand/Collapse Icon */}
        <FiChevronDown
          className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />

        {/* Status Dot */}
        <div
          className={`w-2 h-2 rounded-full flex-shrink-0 ${
            task.isCompleted
              ? "bg-emerald-400"
              : task.isPriority
                ? "bg-amber-400"
                : "bg-purple-400"
          }`}
        />

        {/* Task Headline */}
        <span
          className={`text-sm flex-1 truncate ${
            task.isCompleted
              ? "text-gray-500 line-through"
              : task.isPriority
                ? "text-amber-100 font-medium"
                : "text-gray-200"
          }`}
        >
          {task.headline}
        </span>

        {/* Completed Badge */}
        {task.isCompleted && (
          <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 flex-shrink-0">
            ✓
          </span>
        )}

        {/* Action Buttons */}
        <div className="flex gap-0.5 flex-shrink-0">
          {/* Priority Toggle */}
          {!task.isCompleted && (
            <button
              onClick={(e) => onTogglePriority(e, task)}
              className={`p-2 rounded-lg transition-colors ${task.isPriority ? "text-amber-400 bg-amber-400/10" : "text-gray-500 hover:text-amber-400 hover:bg-amber-400/10"}`}
            >
              <FiStar
                size={14}
                className={task.isPriority ? "fill-current" : ""}
              />
            </button>
          )}

          {/* Edit Button */}
          <button
            onClick={(e) => onEdit(e, task)}
            className="p-2 rounded-lg text-gray-500 hover:text-purple-400 hover:bg-purple-500/10"
          >
            <FiEdit size={14} />
          </button>

          {/* Complete/Undo Button */}
          <button
            onClick={(e) => onToggleTask(e, task)}
            className={`p-2 rounded-lg ${task.isCompleted ? "text-emerald-400 bg-emerald-500/10" : "text-gray-500 hover:text-emerald-400 hover:bg-emerald-500/10"}`}
          >
            {task.isCompleted ? (
              <FiRotateCcw size={14} />
            ) : (
              <FiCheck size={14} />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Description Area */}
      <div
        className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="ml-7 p-3 bg-gray-800/30 rounded-lg text-sm text-gray-400">
          {task.task}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
