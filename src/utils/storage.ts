import { Task } from '../types';

const STORAGE_KEY = 'todo-app-tasks';

export const getTasks = (): Task[] => {
  const tasksJson = localStorage.getItem(STORAGE_KEY);
  if (!tasksJson) return [];
  
  try {
    const parsedTasks = JSON.parse(tasksJson);
    return parsedTasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : null
    }));
  } catch (error) {
    console.error('Failed to parse tasks from localStorage:', error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};