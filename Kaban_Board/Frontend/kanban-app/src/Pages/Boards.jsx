import React, { useState } from 'react';
import List from './List';
import './Boards.css';

const Boards = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [draggedTask, setDraggedTask] = useState(null);

  const handleAddTask = () => {
    if (newTask.trim() && newDescription.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTask,
          description: newDescription,
          status: 'Todo',
        },
      ]);
      setNewTask('');
      setNewDescription('');
    }
  };

  const handleEditTask = (id, updatedTitle, updatedDescription) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title: updatedTitle, description: updatedDescription }
          : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleDragStart = (task) => setDraggedTask(task);

  const handleDrop = (status) => {
    if (draggedTask) {
      setTasks(
        tasks.map((task) =>
          task.id === draggedTask.id ? { ...task, status } : task
        )
      );
      setDraggedTask(null);
    }
  };

  const filterTasks = (status) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="boards-container">
      <h2>Kanban Board</h2>
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a task title"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <textarea
          placeholder="Enter task description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="board-columns">
        {['Todo', 'In Progress', 'Completed'].map((status) => (
          <List
            key={status}
            title={status}
            tasks={filterTasks(status)}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Boards;
