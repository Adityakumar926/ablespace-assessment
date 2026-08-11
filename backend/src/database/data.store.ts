import * as fs from 'fs';
import * as path from 'path';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'UNDER_REVIEW' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  dueDate: string;
  assignee: string;
  assigneeAvatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  id: string;
  username: string;
  role: 'GUEST' | 'USER';
  createdAt: string;
}

export interface ThemePreference {
  theme: string; // 'light' | 'dark' | 'emerald' | 'purple'
}

const DATA_FILE = path.join(process.cwd(), 'database_store.json');

const initialTasks: Task[] = [
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
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
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
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
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
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
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
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  }
];

interface DBStructure {
  tasks: Task[];
  sessions: UserSession[];
  theme: ThemePreference;
}

export class DataStore {
  private static load(): DBStructure {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Error reading DB file, using defaults:', e);
    }
    return {
      tasks: initialTasks,
      sessions: [{ id: 'guest-session-1', username: 'Guest Educator', role: 'GUEST', createdAt: new Date().toISOString() }],
      theme: { theme: 'light' }
    };
  }

  private static save(data: DBStructure): void {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error saving DB file:', e);
    }
  }

  public static getTasks(): Task[] {
    return this.load().tasks;
  }

  public static getTaskById(id: string): Task | undefined {
    return this.load().tasks.find(t => t.id === id);
  }

  public static saveTask(task: Task): Task {
    const data = this.load();
    const idx = data.tasks.findIndex(t => t.id === task.id);
    if (idx >= 0) {
      data.tasks[idx] = task;
    } else {
      data.tasks.unshift(task);
    }
    this.save(data);
    return task;
  }

  public static deleteTask(id: string): boolean {
    const data = this.load();
    const initialLen = data.tasks.length;
    data.tasks = data.tasks.filter(t => t.id !== id);
    if (data.tasks.length !== initialLen) {
      this.save(data);
      return true;
    }
    return false;
  }

  public static createGuestSession(): UserSession {
    const data = this.load();
    const newSession: UserSession = {
      id: 'guest_' + Date.now(),
      username: 'Guest Educator',
      role: 'GUEST',
      createdAt: new Date().toISOString()
    };
    data.sessions.push(newSession);
    this.save(data);
    return newSession;
  }

  public static getTheme(): ThemePreference {
    return this.load().theme;
  }

  public static setTheme(theme: string): ThemePreference {
    const data = this.load();
    data.theme = { theme };
    this.save(data);
    return data.theme;
  }
}
