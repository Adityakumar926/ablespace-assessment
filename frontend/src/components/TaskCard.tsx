'use client';

import React from 'react';
import { Task } from '../lib/api';
import { Clock, Tag, Edit3, Trash2, CheckCircle2, ChevronRight } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: Task['status']) => void;
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const getPriorityStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30';
      case 'HIGH':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'MEDIUM':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      case 'LOW':
      default:
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30';
    }
  };

  const statusOptions: { id: Task['status']; label: string }[] = [
    { id: 'TODO', label: 'To Do' },
    { id: 'IN_PROGRESS', label: 'In Progress' },
    { id: 'UNDER_REVIEW', label: 'In Review' },
    { id: 'COMPLETED', label: 'Completed' },
  ];

  return (
    <div className="group theme-bg-card p-4 rounded-2xl border theme-border shadow-sm hover:shadow-md transition-all duration-200 space-y-3">
      {/* Category & Priority Badge */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          <Tag className="w-3 h-3 text-slate-400" />
          {task.category || 'General'}
        </span>

        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getPriorityStyle(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      {/* Task Title & Description */}
      <div>
        <h4 className="font-bold text-sm theme-text-main group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
          {task.title}
        </h4>
        {task.description && (
          <p className="text-xs theme-text-muted mt-1 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}
      </div>

      {/* Footer Info: Due Date, Assignee, Actions */}
      <div className="pt-2 border-t theme-border flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 theme-text-muted text-[11px]">
          <Clock className="w-3.5 h-3.5" />
          <span>{task.dueDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <img
            src={task.assigneeAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt={task.assignee}
            className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-700 object-cover"
            title={`Assigned to ${task.assignee}`}
          />

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(task)}
              className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-md transition"
              title="Edit Task"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 text-rose-500 hover:text-rose-700 rounded-md transition"
              title="Delete Task"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Move Bar */}
      <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
        <span>Status:</span>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
          className="bg-slate-100 dark:bg-slate-800 border theme-border rounded-lg px-2 py-0.5 font-medium theme-text-main focus:outline-none text-[11px]"
        >
          {statusOptions.map(s => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
