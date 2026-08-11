'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { TaskBoard } from '../components/TaskBoard';
import { TaskList } from '../components/TaskList';
import { TaskModal } from '../components/TaskModal';
import { GuestLoginModal } from '../components/GuestLoginModal';
import { Task, fetchTasks, createTask, updateTask, deleteTask, loginGuest } from '../lib/api';
import { Search, Filter, RefreshCw, FileText, Sparkles, UserCheck } from 'lucide-react';

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultNewStatus, setDefaultNewStatus] = useState<Task['status']>('TODO');

  // Guest Session State
  const [guestUser, setGuestUser] = useState<{ username: string; token: string } | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchTasks(undefined, priorityFilter, searchQuery);
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // Auto guest session initialization
    loginGuest().then(g => setGuestUser(g));
  }, [priorityFilter, searchQuery]);

  const handleGuestLoginSubmit = async (username: string) => {
    const session = await loginGuest();
    const updatedSession = { ...session, username };
    setGuestUser(updatedSession);
  };

  const handleSaveTask = async (taskData: Partial<Task>) => {
    if (editingTask) {
      const updated = await updateTask(editingTask.id, taskData);
      setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
    } else {
      const created = await createTask({
        ...taskData,
        status: taskData.status || defaultNewStatus,
        assignee: guestUser?.username || 'Guest Educator',
      });
      setTasks(prev => [created, ...prev]);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    await deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleStatusChange = async (id: string, newStatus: Task['status']) => {
    const updated = await updateTask(id, { status: newStatus });
    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
  };

  const handleOpenNewTask = (status: Task['status'] = 'TODO') => {
    setEditingTask(null);
    setDefaultNewStatus(status);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col theme-bg-main">
      {/* Navbar */}
      <Navbar
        viewMode={viewMode}
        onViewChange={setViewMode}
        onOpenNewTask={() => handleOpenNewTask('TODO')}
        guestUser={guestUser}
        onOpenGuestModal={() => setIsGuestModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner: AbleSpace Assessment Title & Part 2 Link */}
        <div className="theme-bg-card p-6 sm:p-8 rounded-3xl border theme-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
              <Sparkles className="w-3.5 h-3.5" /> AbleSpace Technical Assessment
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold theme-text-main tracking-tight">
              Task Management System
            </h1>
            <p className="text-xs theme-text-muted max-w-2xl leading-relaxed">
              Full Stack Task Management Dashboard built with Next.js App Router, Tailwind CSS, multi-theme persistence, Guest Login, and NestJS API integration.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => setIsGuestModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold flex items-center justify-center gap-2 border border-sky-500/20 transition"
            >
              <UserCheck className="w-4 h-4" /> Guest Portal
            </button>

            <a
              href="https://github.com/Adityakumar926/ablespace-assessment/blob/main/part-2/part_2_product_understanding.md"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow"
            >
              <FileText className="w-4 h-4 text-sky-400" /> View Part 2 Report
            </a>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="theme-bg-card p-4 rounded-2xl border theme-border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search tasks by title, category, or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 theme-bg-main border theme-border rounded-xl text-xs theme-text-main focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter className="w-4 h-4 theme-text-muted" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3.5 py-2 theme-bg-main border theme-border rounded-xl text-xs font-medium theme-text-main focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="">All Priorities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>

            <button
              onClick={loadData}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-xl border theme-border transition"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Board or List View Rendering */}
        {loading ? (
          <div className="py-20 text-center text-xs theme-text-muted font-mono">
            Loading tasks data...
          </div>
        ) : viewMode === 'board' ? (
          <TaskBoard
            tasks={tasks}
            onEdit={handleOpenEditTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            onNewTaskInColumn={(colStatus) => handleOpenNewTask(colStatus)}
          />
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={handleOpenEditTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        )}
      </main>

      {/* Task Modal (Create & Edit) */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        initialTask={editingTask}
      />

      {/* Guest Login Modal */}
      <GuestLoginModal
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        onLogin={handleGuestLoginSubmit}
        currentGuest={guestUser}
      />
    </div>
  );
}
