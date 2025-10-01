import { useState, useEffect, useMemo } from 'react';
import { Task, FilterOptions } from '../types';
import { useLocalStorage } from './useLocalStorage';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Implement user authentication',
    description: 'Set up login and registration system with proper validation',
    category: 'work',
    priority: 'high',
    status: 'in-progress',
    assignedTo: 'john@example.com',
    dueDate: '2025-01-20',
    createdAt: '2025-01-10T10:00:00Z',
    tags: ['authentication', 'security', 'backend']
  },
  {
    id: '2',
    title: 'Design responsive navbar',
    description: 'Create a mobile-friendly navigation component',
    category: 'work',
    priority: 'medium',
    status: 'completed',
    assignedTo: 'sarah@example.com',
    dueDate: '2025-01-15',
    createdAt: '2025-01-08T14:30:00Z',
    tags: ['ui', 'responsive', 'navbar']
  },
  {
    id: '3',
    title: 'Buy groceries',
    description: 'Weekly grocery shopping for the family',
    category: 'personal',
    priority: 'low',
    status: 'pending',
    dueDate: '2025-01-18',
    createdAt: '2025-01-12T09:15:00Z',
    tags: ['shopping', 'family']
  }
];

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', initialTasks);
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    priority: 'all',
    status: 'all',
    assignedTo: 'all',
    search: ''
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filters.category !== 'all' && task.category !== filters.category) return false;
      if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
      if (filters.status !== 'all' && task.status !== filters.status) return false;
      if (filters.assignedTo !== 'all' && task.assignedTo !== filters.assignedTo) return false;
      if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }, [tasks, filters]);

  const addTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, task]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedTasks = tasks.length;

  const taskStats = {
    total: tasks.length,
    completed: completedTasks,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length
  };

  return {
    tasks: filteredTasks,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    taskStats
  };
}