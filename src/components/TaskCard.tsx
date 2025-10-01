import React from 'react';
import { Calendar, User, Tag, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    onStatusChange(task.id, newStatus);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`} />
          <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onEdit(task)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-red-600"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{task.description}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map((tag, index) => (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Tag size={10} className="mr-1" />
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          
          {task.assignedTo && (
            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
              <User size={12} />
              <span>{task.assignedTo}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
          <Calendar size={12} />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
          className="text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}