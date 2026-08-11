'use client';

import React, { useState, useEffect } from 'react';
import { Task } from '../lib/api';
import { X, Check } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Partial<Task>) => void;
  initialTask?: Task | null;
}

export function TaskModal({ isOpen, onClose, onSave, initialTask }: TaskModalProps) {
  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    category: 'Development',
    dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    assignee: 'Guest Educator',
  });

  useEffect(() => {
    if (initialTask) {
      setFormData(initialTask);
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'TODO',
        priority: 'MEDIUM',
        category: 'Development',
        dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
        assignee: 'Guest Educator',
      });
    }
  }, [initialTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) return;
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="theme-bg-card rounded-3xl max-w-lg w-full p-6 border theme-border shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b theme-border pb-4">
          <h3 className="text-lg font-bold theme-text-main">
            {initialTask ? 'Edit Task' : 'Create New Task'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold theme-text-main mb-1 uppercase tracking-wider">
              Task Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Implement SpEd IEP Progress Alert"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border theme-border theme-bg-main theme-text-main focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block font-bold theme-text-main mb-1 uppercase tracking-wider">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Detailed task description, acceptance criteria, or design notes..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border theme-border theme-bg-main theme-text-main focus:outline-none focus:ring-2 focus:ring-sky-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold theme-text-main mb-1 uppercase tracking-wider">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
                className="w-full px-3.5 py-2.5 rounded-xl border theme-border theme-bg-main theme-text-main focus:outline-none"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div>
              <label className="block font-bold theme-text-main mb-1 uppercase tracking-wider">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                className="w-full px-3.5 py-2.5 rounded-xl border theme-border theme-bg-main theme-text-main focus:outline-none"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold theme-text-main mb-1 uppercase tracking-wider">
                Category
              </label>
              <input
                type="text"
                placeholder="Development, UI/UX, SpEd"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border theme-border theme-bg-main theme-text-main focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold theme-text-main mb-1 uppercase tracking-wider">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border theme-border theme-bg-main theme-text-main focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t theme-border flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border theme-border text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold flex items-center gap-1.5 shadow transition"
            >
              <Check className="w-4 h-4" /> Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
