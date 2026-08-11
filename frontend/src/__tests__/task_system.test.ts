import { describe, it, expect, beforeEach } from 'vitest';
import { fetchTasks, createTask, updateTask, deleteTask, loginGuest } from '../lib/api';

describe('AbleSpace Task Management System & Guest Auth Test Suite', () => {
  it('1. Guest Login: Generates a valid guest session token and username', async () => {
    const session = await loginGuest();
    expect(session).toBeDefined();
    expect(session.username).toBe('Guest Educator');
    expect(session.token).toContain('guest_token_');
  });

  it('2. Task Fetching: Returns initial task list with categories and priorities', async () => {
    const tasks = await fetchTasks();
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBeGreaterThan(0);
    expect(tasks[0]).toHaveProperty('title');
    expect(tasks[0]).toHaveProperty('status');
  });

  it('3. Task Creation & Status Modification: Creates task and updates status', async () => {
    const newTask = await createTask({
      title: 'Unit Test Task',
      description: 'Automated test task creation',
      priority: 'URGENT',
      category: 'Testing'
    });

    expect(newTask).toBeDefined();
    expect(newTask.title).toBe('Unit Test Task');
    expect(newTask.status).toBe('TODO');

    const updated = await updateTask(newTask.id, { status: 'COMPLETED' });
    expect(updated.status).toBe('COMPLETED');
  });
});
