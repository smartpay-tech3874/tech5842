export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'work' | 'personal' | 'urgent';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo?: string;
  dueDate: string;
  createdAt: string;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member';
}

export interface FilterOptions {
  category: string;
  priority: string;
  status: string;
  assignedTo: string;
  search: string;
}