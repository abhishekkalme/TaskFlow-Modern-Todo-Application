import React, { useState } from 'react';
import { PlusCircle, Calendar, Flag } from 'lucide-react';
import { Task } from '../types';

interface TaskFormProps {
  addTask: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [dueDate, setDueDate] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    addTask({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setIsExpanded(false);
  };

  const priorityColors = {
    low: 'bg-green-500 hover:bg-green-600',
    medium: 'bg-amber-500 hover:bg-amber-600',
    high: 'bg-red-500 hover:bg-red-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-3">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="flex-1 p-2 border-b-2 border-gray-200 focus:border-blue-500 outline-none text-lg transition-all"
          />
          <button
            type="submit"
            disabled={!title.trim()}
            className={`ml-3 rounded-full p-2 text-white transition-all ${
              title.trim() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
            }`}
            aria-label="Add task"
          >
            <PlusCircle size={24} />
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <textarea
                placeholder="Add description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-md focus:border-blue-500 outline-none resize-none transition-all min-h-[80px]"
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <Flag size={18} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600 mr-2">Priority:</span>
                <div className="flex space-x-2">
                  {(['low', 'medium', 'high'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`px-3 py-1 rounded-full text-xs text-white transition-all ${
                        priority === p 
                          ? priorityColors[p]
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar size={18} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600 mr-2">Due date:</span>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="px-3 py-1 border border-gray-200 rounded-md text-sm focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TaskForm;