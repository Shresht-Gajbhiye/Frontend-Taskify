import { useState, useEffect, useCallback } from "react";
import { FiTarget, FiAlertCircle, FiRefreshCw, FiClock } from "react-icons/fi";
import CreateTask from "./CreateTask";
import TaskItem from "./TaskItem";
import StatsCard from "./StatsCard";
import FilterTabs from "./FilterTabs";
import EditModal from "./EditModal";

const TaskList = () => {
  // Application States
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState("all");

  const token = localStorage.getItem("token");
  const API = `${import.meta.env.VITE_API_URL}/api/todos`;

  // Fetch all tasks from backend
  const fetchTasks = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch(`${API}/all`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to load tasks");
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : data.data || data.tasks || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, API]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Filter and sort logic
  const filtered = tasks
    .filter((t) => {
      if (filter === "pending") return !t.isCompleted;
      if (filter === "completed") return t.isCompleted;
      if (filter === "priority") return t.isPriority && !t.isCompleted;
      return true;
    })
    .sort((a, b) => {
      if (!a.isCompleted && b.isCompleted) return -1;
      if (a.isCompleted && !b.isCompleted) return 1;
      if (!a.isCompleted && !b.isCompleted) {
        if (a.isPriority && !b.isPriority) return -1;
        if (!a.isPriority && b.isPriority) return 1;
      }
      return 0;
    });

  // Calculate progress stats
  const done = tasks.filter((t) => t.isCompleted).length;
  const progress = tasks.length ? (done / tasks.length) * 100 : 0;

  // Task Handlers (Toggle Complete, Priority, Edit, Update)
  const toggleTask = async (e, task) => {
    e.stopPropagation();
    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) =>
        t._id === task._id ? { ...t, isCompleted: !t.isCompleted } : t,
      ),
    );
    try {
      await fetch(
        `${API}/${task.isCompleted ? "Undo" : "Complete"}/${task._id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
    } catch {
      fetchTasks(); // Revert on failure
    }
  };

  const togglePriority = async (e, task) => {
    e.stopPropagation();
    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) =>
        t._id === task._id ? { ...t, isPriority: !t.isPriority } : t,
      ),
    );
    try {
      await fetch(`${API}/Priority/${task._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch {
      fetchTasks(); // Revert on failure
    }
  };

  const handleEdit = (e, task) => {
    e.stopPropagation();
    setEditTask(task);
  };

  const handleUpdate = async (id, formData) => {
    const res = await fetch(`${API}/Update/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const updated = await res.json();
      setTasks((prev) =>
        prev.map((t) => (t._id === updated._id ? updated : t)),
      );
      setEditTask(null);
    }
  };

  // Loading UI
  if (loading)
    return (
      <div className="min-h-screen bg-[#0a0a0f] grid place-items-center">
        <div className="w-10 h-10 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );

  // Error UI
  if (error)
    return (
      <div className="min-h-screen bg-[#0a0a0f] grid place-items-center p-4">
        <div className="bg-gray-900 rounded-2xl p-8 max-w-sm text-center border border-red-500/20">
          <FiAlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-white font-bold text-lg mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-400 text-sm mb-6">{error}</p>
          <button
            onClick={fetchTasks}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl flex items-center gap-2 mx-auto"
          >
            <FiRefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      </div>
    );

  // Main UI
  return (
    <div className="min-h-screen bg-[#0a0a0f] p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Info Banner */}
        <div className="mb-4 p-3 bg-gray-900/50 border border-gray-700/30 rounded-xl flex flex-col items-center justify-center gap-2">
          <FiClock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />
          <p className="text-[11px] sm:text-xs text-center text-gray-400">
            Tasks automatically delete at midnight by server
          </p>
        </div>

        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              My Tasks
            </h1>
            <p className="text-gray-500 text-xs mt-1">
              {tasks.length
                ? `${done}/${tasks.length} completed`
                : "No tasks yet"}
            </p>
          </div>
          <CreateTask
            onTaskCreated={(newTask) =>
              setTasks((prev) => [newTask.data || newTask, ...prev])
            }
          />
        </div>

        {/* Stats & Filters */}
        {tasks.length > 0 && (
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 mb-6 border border-gray-700/50">
            <StatsCard tasks={tasks} done={done} progress={progress} />
            <FilterTabs filter={filter} onFilterChange={setFilter} />
          </div>
        )}

        {/* Task List Container */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 bg-gray-800/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FiTarget className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-gray-400 text-sm font-medium">
                {filter !== "all" ? `No ${filter} tasks` : "No tasks yet"}
              </p>
            </div>
          ) : (
            filtered.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                isExpanded={expandedId === task._id}
                onToggleExpand={(id) =>
                  setExpandedId(expandedId === id ? null : id)
                }
                onToggleTask={toggleTask}
                onTogglePriority={togglePriority}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>
      </div>

      {/* Edit Modal Component */}
      {editTask && (
        <EditModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default TaskList;
