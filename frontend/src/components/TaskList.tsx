'use client';

import React from 'react';
import { Task } from '../lib/api';
import { Edit3, Trash2, Tag, Clock } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: Task['status']) => void;
}

export function TaskList({ tasks, onEdit, onDelete, onStatusChange }: TaskListProps) {
  const getPriorityStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'URGENT': return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30';
      case 'HIGH': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'MEDIUM': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      default: return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="theme-bg-card rounded-3xl border theme-border overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 dark:bg-slate-900 theme-text-muted uppercase font-bold text-[10px] tracking-wider border-b theme-border">
            <tr>
              <th className="px-6 py-3.5">Task & Category</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5">Priority</th>
              <th className="px-6 py-3.5">Due Date</th>
              <th className="px-6 py-3.5">Assignee</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y theme-border">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center theme-text-muted">
                  No tasks matching current filters.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4">
                    <div className="font-bold theme-text-main text-sm">{task.title}</div>
                    <div className="text-[11px] theme-text-muted mt-0.5 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 font-semibold">
                        <Tag className="w-3 h-3" /> {task.category}
                      </span>
                      <span>•</span>
                      <span className="line-clamp-1">{task.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={task.status}
                      onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
                      className="bg-slate-100 dark:bg-slate-800 border theme-border rounded-lg px-2.5 py-1 text-xs font-semibold theme-text-main"
                    >
                      <option value="TODO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="UNDER_REVIEW">In Review</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getPriorityStyle(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 theme-text-muted font-mono">
                    {task.dueDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={task.assigneeAvatar}
                        alt={task.assignee}
                        className="w-6 h-6 rounded-full border theme-border object-cover"
                      />
                      <span className="font-semibold theme-text-main">{task.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => onEdit(task)}
                      className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg transition"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
