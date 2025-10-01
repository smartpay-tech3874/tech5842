import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { TaskCard } from './components/TaskCard';
import { TaskModal } from './components/TaskModal';
import { TaskFilters } from './components/TaskFilters';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTasks } from './hooks/useTasks';
import { Task } from './types';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const {
    tasks,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    taskStats
  } = useTasks();

  const handleCreateTask = () => {
    setEditTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditTask(task);
    setIsModalOpen(true);
  };

  const handleSubmitTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editTask) {
      updateTask(editTask.id, taskData);
    } else {
      addTask(taskData);
    }
    setIsModalOpen(false);
    setEditTask(null);
  };

  const handleStatusChange = (id: string, status: Task['status']) => {
    updateTask(id, { status });
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard taskStats={taskStats} />;
      
      case 'tasks':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h2>
                <p className="text-gray-600 dark:text-gray-300">Manage your tasks efficiently</p>
              </div>
              <button
                onClick={handleCreateTask}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                <span>New Task</span>
              </button>
            </div>

            <TaskFilters filters={filters} onFilterChange={setFilters} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={deleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>

            {tasks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">No tasks found</p>
                <button
                  onClick={handleCreateTask}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Your First Task
                </button>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">This feature is coming soon!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        
        <div className="flex-1">
          <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditTask(null);
        }}
        onSubmit={handleSubmitTask}
        editTask={editTask}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;