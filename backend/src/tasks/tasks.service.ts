import { Injectable, NotFoundException } from '@nestjs/common';
import { DataStore, Task, TaskStatus, TaskPriority } from '../database/data.store';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  findAll(status?: TaskStatus, priority?: TaskPriority, search?: string): Task[] {
    let tasks = DataStore.getTasks();

    if (status) {
      tasks = tasks.filter(t => t.status === status);
    }
    if (priority) {
      tasks = tasks.filter(t => t.priority === priority);
    }
    if (search) {
      const q = search.toLowerCase();
      tasks = tasks.filter(
        t => t.title.toLowerCase().includes(q) ||
             t.description.toLowerCase().includes(q) ||
             t.category.toLowerCase().includes(q)
      );
    }

    return tasks;
  }

  findOne(id: string): Task {
    const task = DataStore.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: 'task-' + Date.now(),
      title: createTaskDto.title,
      description: createTaskDto.description || '',
      status: createTaskDto.status || 'TODO',
      priority: createTaskDto.priority || 'MEDIUM',
      category: createTaskDto.category || 'General',
      dueDate: createTaskDto.dueDate || new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      assignee: createTaskDto.assignee || 'Guest Educator',
      assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return DataStore.saveTask(newTask);
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);

    const updatedTask: Task = {
      ...task,
      ...updateTaskDto,
      updatedAt: new Date().toISOString(),
    };

    return DataStore.saveTask(updatedTask);
  }

  remove(id: string): { success: boolean; id: string } {
    this.findOne(id); // Throws NotFoundException if missing
    DataStore.deleteTask(id);
    return { success: true, id };
  }
}
