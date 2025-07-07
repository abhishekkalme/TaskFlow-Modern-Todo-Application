import { useState, useEffect } from 'react';
import { Task, TaskFilter } from '../types';
import { getTasks, saveTasks } from '../utils/storage';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  
  useEffect(() => {
    setTasks(getTasks());
  }, []);
  
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);
  
  const addTask = (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date(),
      ...taskData,
    };
    
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };
  
  const toggleTaskCompletion = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };
  
  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });
  
  return {
    tasks: filteredTasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    updateTask,
    filter,
    setFilter,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(task => task.completed).length,
    activeTasks: tasks.filter(task => !task.completed).length,
  };
};