import React from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useTasks } from './hooks/useTasks';

function App() {
  const {
    tasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    filter,
    setFilter,
    totalTasks,
    completedTasks,
    activeTasks,
  } = useTasks();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        filter={filter}
        setFilter={setFilter}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        activeTasks={activeTasks}
      />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <TaskForm addTask={addTask} />
        
        <TaskList
          tasks={tasks}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;