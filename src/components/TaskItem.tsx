import React, { useState } from 'react';
import { CheckCircle, Circle, Trash2, Flag, Calendar, AlertCircle } from 'lucide-react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  toggleCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  toggleCompletion,
  deleteTask,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = () => {
    if (isDeleting) {
      deleteTask(task.id);
    } else {
      setIsDeleting(true);
      // Auto-reset after 3 seconds
      setTimeout(() => setIsDeleting(false), 3000);
    }
  };

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  
  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-amber-100 text-amber-800 border-amber-200',
    high: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border-l-4 p-4 mb-3 transition-all duration-300 hover:shadow-md ${
        task.completed 
          ? 'border-gray-300 opacity-75' 
          : task.priority === 'high' 
            ? 'border-red-500' 
            : task.priority === 'medium' 
              ? 'border-amber-500' 
              : 'border-green-500'
      }`}
    >
      <div className="flex items-start">
        <button
          onClick={() => toggleCompletion(task.id)}
          className={`flex-shrink-0 mt-1 mr-3 transition-all duration-300 ${
            task.completed ? 'text-green-500' : 'text-gray-400 hover:text-blue-500'
          }`}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? (
            <CheckCircle size={22} className="animate-checkmark" />
          ) : (
            <Circle size={22} />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
            <h3 
              className={`text-lg font-medium mb-1 sm:mb-0 ${
                task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
              }`}
            >
              {task.title}
            </h3>
            
            <div className="flex items-center space-x-2 text-sm">
              <span 
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}
              >
                <span className="flex items-center">
                  <Flag size={12} className="mr-1" />
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </span>
              
              {task.dueDate && (
                <span 
                  className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center ${
                    isOverdue
                      ? 'bg-red-100 text-red-800 border-red-200'
                      : 'bg-blue-100 text-blue-800 border-blue-200'
                  }`}
                >
                  {isOverdue ? (
                    <AlertCircle size={12} className="mr-1" />
                  ) : (
                    <Calendar size={12} className="mr-1" />
                  )}
                  {formatDate(task.dueDate)}
                </span>
              )}
            </div>
          </div>
          
          {task.description && (
            <p className={`text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
        </div>
        
        <button
          onClick={handleDelete}
          className={`flex-shrink-0 ml-3 transition-all duration-300 p-1.5 rounded-full ${
            isDeleting
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
          }`}
          aria-label={isDeleting ? "Confirm delete" : "Delete task"}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;