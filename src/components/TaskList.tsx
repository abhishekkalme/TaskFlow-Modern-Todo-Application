import React from 'react';
import { ClipboardList } from 'lucide-react';
import TaskItem from './TaskItem';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleTaskCompletion,
  deleteTask,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <ClipboardList size={64} className="text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-600 mb-2">No tasks found</h3>
        <p className="text-gray-500 max-w-md">
          You don't have any tasks in this view. Add a new task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1 animate-fadeIn">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;