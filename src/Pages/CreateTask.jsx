import { useState } from "react";
import { FiX, FiPlus } from "react-icons/fi";

const CreateTask = ({ onTaskCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ headline: "", task: "" });

  const token = localStorage.getItem("token");
  const API = `${import.meta.env.VITE_API_URL}/api/todos`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/Create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newTask = await res.json();
      onTaskCreated(newTask);
      setIsOpen(false);
      setForm({ headline: "", task: "" });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-medium active:scale-95 transition-all"
      >
        <FiPlus className="w-4 h-4" />{" "}
        <span className="hidden sm:inline">Add Task</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm grid place-items-center p-4 z-50">
          <div className="bg-[#0f0f17] rounded-2xl p-5 sm:p-6 w-full max-w-md border border-gray-700/50">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-white">Create Task</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-gray-500 hover:text-red-400"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                value={form.headline}
                onChange={(e) => setForm({ ...form, headline: e.target.value })}
                className="w-full bg-[#0a0a0f] border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-purple-500/30 focus:outline-none"
                placeholder="Headline"
                required
              />
              <textarea
                value={form.task}
                onChange={(e) => setForm({ ...form, task: e.target.value })}
                rows={4}
                className="w-full bg-[#0a0a0f] border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-purple-500/30 focus:outline-none resize-none"
                placeholder="Description"
                required
              />
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 bg-gray-800/50 text-gray-400 rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTask;
