"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Loader2,
  CheckCircle2,
  Circle,
  Clock,
  Trash2,
  ArrowLeft,
  Save,
  AlertTriangle,
  Target,
  Calendar,
  Link as LinkIcon,
  Zap,
} from "lucide-react";

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string | null;
  category: string;
  relatedUrl: string;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const priorityConfig: Record<string, { label: string; color: string }> = {
  high: { label: "High", color: "text-red-400 bg-red-500/10" },
  medium: { label: "Medium", color: "text-amber-400 bg-amber-500/10" },
  low: { label: "Low", color: "text-zinc-400 bg-zinc-800/50" },
};

const categoryConfig: Record<string, { label: string; color: string }> = {
  content: { label: "Content", color: "text-violet-400 bg-violet-500/10" },
  admin: { label: "Admin", color: "text-zinc-400 bg-zinc-800/50" },
  research: { label: "Research", color: "text-emerald-400 bg-emerald-500/10" },
  outreach: { label: "Outreach", color: "text-rose-400 bg-rose-500/10" },
};

const statusCycle = ["todo", "in-progress", "done"];

export default function WorkflowPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "content",
    dueDate: "",
    relatedUrl: "",
  });
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    const res = await fetch(`/api/tasks?${params}`);
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  }, [search]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const openForm = (task?: Task) => {
    if (task) {
      setEditingId(task._id);
      setForm({
        title: task.title,
        description: task.description,
        priority: task.priority,
        category: task.category,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : "",
        relatedUrl: task.relatedUrl,
      });
    } else {
      setEditingId(null);
      setForm({
        title: "",
        description: "",
        priority: "medium",
        category: "content",
        dueDate: "",
        relatedUrl: "",
      });
    }
    setShowForm(true);
  };

  const saveTask = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const payload = {
        ...form,
        dueDate: form.dueDate ? new Date(form.dueDate) : null,
      };
      if (editingId) {
        const res = await fetch("/api/tasks", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        const updated = await res.json();
        setTasks((prev) => prev.map((t) => (t._id === editingId ? updated : t)));
      } else {
        const res = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        setTasks((prev) => [created, ...prev]);
      }
      setShowForm(false);
    } catch {
    } finally {
      setSaving(false);
    }
  };

  const deleteTask = async (id: string) => {
    if (!confirm("Delete this task?")) return;
    await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const cycleStatus = async (task: Task) => {
    const idx = statusCycle.indexOf(task.status);
    const next = statusCycle[(idx + 1) % statusCycle.length];
    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task._id, status: next }),
    });
    const updated = await res.json();
    setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)));
  };

  const isOverdue = (task: Task) => {
    if (!task.dueDate || task.status === "done") return false;
    return new Date(task.dueDate) < new Date(new Date().toDateString());
  };

  const isDueToday = (task: Task) => {
    if (!task.dueDate) return false;
    const due = new Date(task.dueDate).toDateString();
    return due === new Date().toDateString();
  };

  const isCompletedToday = (task: Task) => {
    if (!task.completedAt) return false;
    return new Date(task.completedAt).toDateString() === new Date().toDateString();
  };

  const highPriorityIncomplete = tasks.filter(
    (t) => t.priority === "high" && t.status !== "done"
  );

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  const tasksDueToday = tasks.filter(isDueToday).length;
  const tasksCompletedToday = tasks.filter(isCompletedToday).length;
  const overdueCount = tasks.filter(isOverdue).length;

  const renderTask = (task: Task) => {
    const pc = priorityConfig[task.priority] || priorityConfig.medium;
    const cc = categoryConfig[task.category] || categoryConfig.content;
    const overdue = isOverdue(task);
    return (
      <div
        key={task._id}
        className={`bg-[#111113] border rounded-xl p-4 transition-all ${
          overdue ? "border-red-500/20" : "border-white/[0.06]"
        }`}
      >
        <div className="flex items-start gap-3">
          <button
            onClick={() => cycleStatus(task)}
            className="shrink-0 mt-0.5"
          >
            {task.status === "done" ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            ) : task.status === "in-progress" ? (
              <Clock className="h-5 w-5 text-amber-400" />
            ) : (
              <Circle className="h-5 w-5 text-zinc-600 hover:text-zinc-400 transition-colors" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p
                className={`text-[14px] font-medium ${
                  task.status === "done" ? "text-zinc-500 line-through" : "text-white"
                }`}
              >
                {task.title}
              </p>
              <span
                className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${pc.color}`}
              >
                {pc.label}
              </span>
              <span
                className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${cc.color}`}
              >
                {cc.label}
              </span>
            </div>

            {task.description && (
              <p className="text-[12px] text-zinc-500 mt-1 line-clamp-2">{task.description}</p>
            )}

            <div className="flex items-center gap-3 mt-2">
              {task.dueDate && (
                <span
                  className={`inline-flex items-center gap-1 text-[11px] ${
                    overdue ? "text-red-400" : isDueToday(task) ? "text-amber-400" : "text-zinc-500"
                  }`}
                >
                  <Calendar className="h-3 w-3" />
                  {new Date(task.dueDate).toLocaleDateString()}
                  {overdue && " (overdue)"}
                </span>
              )}
              {task.relatedUrl && (
                <a
                  href={task.relatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <LinkIcon className="h-3 w-3" />
                  Link
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => openForm(task)}
              className="p-1.5 rounded-lg text-zinc-600 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <Circle className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => deleteTask(task._id)}
              className="p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSection = (title: string, tasks: Task[], icon: React.ReactNode) => (
    <div>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="text-[13px] font-semibold text-zinc-400 uppercase tracking-wider">
          {title}
        </h3>
        <span className="text-[11px] text-zinc-600 bg-white/[0.04] px-1.5 py-0.5 rounded">
          {tasks.length}
        </span>
      </div>
      {tasks.length === 0 ? (
        <p className="text-[12px] text-zinc-600 pl-7">No tasks.</p>
      ) : (
        <div className="space-y-2">{tasks.map(renderTask)}</div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-white tracking-[-0.02em]">
            {showForm ? (editingId ? "Edit Task" : "New Task") : "Daily Workflow"}
          </h2>
          <p className="text-[14px] text-zinc-500 mt-1">Today&apos;s tasks and priorities.</p>
        </div>
        <div className="flex items-center gap-2">
          {showForm ? (
            <>
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                onClick={saveTask}
                disabled={saving || !form.title.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-40 transition-colors"
              >
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                {editingId ? "Update" : "Save"}
              </button>
            </>
          ) : (
            <button
              onClick={() => openForm()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-white text-zinc-900 hover:bg-zinc-200 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          )}
        </div>
      </div>

      {showForm ? (
        <div className="space-y-4 max-w-2xl">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Task title..."
            className="w-full bg-transparent text-[24px] font-bold text-white placeholder-zinc-700 focus:outline-none tracking-[-0.02em]"
          />
          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Task details..."
              rows={4}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              >
                {Object.entries(priorityConfig).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              >
                {Object.entries(categoryConfig).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
              Related URL
            </label>
            <input
              value={form.relatedUrl}
              onChange={(e) => setForm({ ...form, relatedUrl: e.target.value })}
              placeholder="https://..."
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-[#111113] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-amber-400" />
                <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                  Due Today
                </span>
              </div>
              <p className="text-[24px] font-bold text-white">{tasksDueToday}</p>
            </div>
            <div className="bg-[#111113] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                  Completed Today
                </span>
              </div>
              <p className="text-[24px] font-bold text-white">{tasksCompletedToday}</p>
            </div>
            <div className="bg-[#111113] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                  Overdue
                </span>
              </div>
              <p className="text-[24px] font-bold text-white">{overdueCount}</p>
            </div>
          </div>

          {highPriorityIncomplete.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-red-400" />
                <h3 className="text-[13px] font-semibold text-red-400 uppercase tracking-wider">
                  Today&apos;s Focus
                </h3>
              </div>
              <div className="space-y-2">
                {highPriorityIncomplete.map(renderTask)}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 text-zinc-600 animate-spin" />
            </div>
          ) : tasks.length === 0 ? (
            <div className="bg-[#111113] rounded-xl border border-white/[0.06] p-16 text-center">
              <Target className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-[14px] text-zinc-500">No tasks yet.</p>
              <p className="text-[12px] text-zinc-600 mt-1">
                Click &quot;Add Task&quot; to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {renderSection("To Do", todoTasks, <Circle className="h-4 w-4 text-zinc-500" />)}
              {renderSection(
                "In Progress",
                inProgressTasks,
                <Clock className="h-4 w-4 text-amber-400" />
              )}
              {renderSection(
                "Done",
                doneTasks,
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
