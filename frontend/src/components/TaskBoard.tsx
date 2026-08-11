'use client';

import React from 'react';
import { Task } from '../lib/api';
import { TaskCard } from './TaskCard';
import { Plus } from 'lucide-react';

interface TaskBoardProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: Task['status']) => void;
  onNewTaskInColumn: (status: Task['status']) => void;
}

const COLUMNS: { id: Task['status']; title: string; color: string }[] = [
  { id: 'TODO', title: 'To Do', color: 'border-slate-400' },
  { id: 'IN_PROGRESS', title: 'In Progress', color: 'border-sky-500' },
  { id: 'UNDER_REVIEW', title: 'Under Review', color: 'border-purple-500' },
  { id: 'COMPLETED', title: 'Completed', color: 'border-emerald-500' },
];

export function TaskBoard({ tasks, onEdit, onDelete, onStatusChange, onNewTaskInColumn }: TaskBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
      {COLUMNS.map((col) => {
        const columnTasks = tasks.filter(t => t.status === col.id);
        return (
          <div key={col.id} className="theme-bg-main p-4 rounded-3xl border theme-border space-y-4">
            {/* Column Header */}
            <div className={`flex items-center justify-between pb-3 border-b-2 ${col.color}`}>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm theme-text-main">{col.title}</h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {columnTasks.length}
                </span>
              </div>
              <button
                onClick={() => onNewTaskInColumn(col.id)}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                title={`Add task to ${col.title}`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Column Task Cards */}
            <div className="space-y-3 min-h-[300px]">
              {columnTasks.length === 0 ? (
                <div className="p-6 text-center text-xs theme-text-muted border border-dashed theme-border rounded-2xl">
                  No tasks in {col.title.toLowerCase()}
                </div>
              ) : (
                columnTasks.map((t) => (
                  <TaskCard
                    key={t.id}
                    task={t}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
