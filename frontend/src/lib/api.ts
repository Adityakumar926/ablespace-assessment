export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'UNDER_REVIEW' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  category: string;
  dueDate: string;
  assignee: string;
  assigneeAvatar: string;
  createdAt: string;
  updatedAt: string;
}

const API_BASE = 'http://localhost:4000/api';

const fallbackTasks: Task[] = [
  {
    id: 'task-101',
    title: 'Implement AbleSpace Caseload Filter',
    description: 'Add multi-select dropdown for filtering IEP goal domains in the caseload roster.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    category: 'Development',
    dueDate: '2026-08-15',
    assignee: 'Guest Educator',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-102',
    title: 'Design One-Handed Mobile Data Mode',
    description: 'Create high-contrast, large touch-target wireframes for trial tallying on tablets.',
    status: 'UNDER_REVIEW',
    priority: 'URGENT',
    category: 'UI/UX Design',
    dueDate: '2026-08-14',
    assignee: 'Sarah Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-103',
    title: 'Offline-First Sync Queue Service Worker',
    description: 'Implement IndexedDB storage for offline trial data logging during school Wi-Fi drops.',
    status: 'TODO',
    priority: 'HIGH',
    category: 'Architecture',
    dueDate: '2026-08-20',
    assignee: 'Marcus Vance',
    assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-104',
    title: 'IEP Goal Progress Chart Acceleration',
    description: 'Optimize Chart.js graph rendering for quarterly student progress reports.',
    status: 'COMPLETED',
    priority: 'MEDIUM',
    category: 'Analytics',
    dueDate: '2026-08-10',
    assignee: 'Guest Educator',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export async function fetchTasks(status?: string, priority?: string, search?: string): Promise<Task[]> {
  try {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (priority) params.set('priority', priority);
    if (search) params.set('search', search);

    const res = await fetch(`${API_BASE}/tasks?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (e) {
    console.warn('Backend API offline, using persistent local store');
  }

  // Local fallback persistence
  let local = fallbackTasks;
  const saved = typeof window !== 'undefined' ? localStorage.getItem('ablespace_tasks') : null;
  if (saved) {
    local = JSON.parse(saved);
  }

  if (status) local = local.filter(t => t.status === status);
  if (priority) local = local.filter(t => t.priority === priority);
  if (search) {
    const q = search.toLowerCase();
    local = local.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
  }
  return local;
}

export async function createTask(taskData: Partial<Task>): Promise<Task> {
  try {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (e) {}

  const newTask: Task = {
    id: 'task-' + Date.now(),
    title: taskData.title || 'Untitled Task',
    description: taskData.description || '',
    status: taskData.status || 'TODO',
    priority: taskData.priority || 'MEDIUM',
    category: taskData.category || 'General',
    dueDate: taskData.dueDate || new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    assignee: taskData.assignee || 'Guest Educator',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const tasks = await fetchTasks();
  tasks.unshift(newTask);
  if (typeof window !== 'undefined') localStorage.setItem('ablespace_tasks', JSON.stringify(tasks));
  return newTask;
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  try {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (e) {}

  const tasks = await fetchTasks();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx >= 0) {
    tasks[idx] = { ...tasks[idx], ...updates, updatedAt: new Date().toISOString() };
    if (typeof window !== 'undefined') localStorage.setItem('ablespace_tasks', JSON.stringify(tasks));
    return tasks[idx];
  }
  throw new Error('Task not found');
}

export async function deleteTask(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
    if (res.ok) return true;
  } catch (e) {}

  let tasks = await fetchTasks();
  tasks = tasks.filter(t => t.id !== id);
  if (typeof window !== 'undefined') localStorage.setItem('ablespace_tasks', JSON.stringify(tasks));
  return true;
}

export async function loginGuest(): Promise<{ token: string; username: string }> {
  try {
    const res = await fetch(`${API_BASE}/auth/guest`, { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      return { token: data.token, username: data.session.username };
    }
  } catch (e) {}

  return { token: 'guest_token_' + Date.now(), username: 'Guest Educator' };
}
