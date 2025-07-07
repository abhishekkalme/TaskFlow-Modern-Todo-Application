import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { TaskFilter } from '../types';

interface HeaderProps {
  filter: TaskFilter;
  setFilter: (filter: TaskFilter) => void;
  totalTasks: number;
  completedTasks: number;
  activeTasks: number;
}

const Header: React.FC<HeaderProps> = ({
  filter,
  setFilter,
  totalTasks,
  completedTasks,
  activeTasks,
}) => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <CheckCircle2 size={28} className="mr-3" />
            <h1 className="text-2xl md:text-3xl font-bold">TaskFlow</h1>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex space-x-4 mb-3 md:mb-0 md:mr-8">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full transition-all duration-200 ${
                  filter === 'all'
                    ? 'bg-white text-blue-600 font-medium'
                    : 'bg-transparent text-white hover:bg-white/20'
                }`}
              >
                All ({totalTasks})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1 rounded-full transition-all duration-200 ${
                  filter === 'active'
                    ? 'bg-white text-blue-600 font-medium'
                    : 'bg-transparent text-white hover:bg-white/20'
                }`}
              >
                Active ({activeTasks})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1 rounded-full transition-all duration-200 ${
                  filter === 'completed'
                    ? 'bg-white text-blue-600 font-medium'
                    : 'bg-transparent text-white hover:bg-white/20'
                }`}
              >
                Completed ({completedTasks})
              </button>
            </div>
            
            <div className="text-sm text-white/80">
              {completedTasks} of {totalTasks} tasks completed
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;