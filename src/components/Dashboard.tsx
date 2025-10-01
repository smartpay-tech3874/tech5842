import React from 'react';
import { CheckSquare, Clock, Users, AlertCircle, TrendingUp, Calendar } from 'lucide-react';

interface DashboardProps {
  taskStats: {
    total: number;
    completed: number;
    pending: number;
    inProgress: number;
  };
}

export function Dashboard({ taskStats }: DashboardProps) {
  const completionRate = (taskStats.completed / taskStats.total * 100).toFixed(1);

  const statCards = [
    {
      title: 'Total Tasks',
      value: taskStats.total,
      icon: CheckSquare,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Completed',
      value: taskStats.completed,
      icon: CheckSquare,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'In Progress',
      value: taskStats.inProgress,
      icon: Clock,
      color: 'bg-yellow-500',
      change: '+5%'
    },
    {
      title: 'Pending',
      value: taskStats.pending,
      icon: AlertCircle,
      color: 'bg-red-500',
      change: '-3%'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-300">Overview of your task management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm font-medium text-green-600">{card.change}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">vs last week</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Completion</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Overall Progress</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-green-600">{taskStats.completed}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
              </div>
              <div>
                <p className="text-lg font-bold text-yellow-600">{taskStats.inProgress}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">In Progress</p>
              </div>
              <div>
                <p className="text-lg font-bold text-red-600">{taskStats.pending}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <CheckSquare className="text-blue-600" size={20} />
              <span className="text-left">Create New Task</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Calendar className="text-green-600" size={20} />
              <span className="text-left">View Calendar</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <TrendingUp className="text-purple-600" size={20} />
              <span className="text-left">View Analytics</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Users className="text-orange-600" size={20} />
              <span className="text-left">Manage Team</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}