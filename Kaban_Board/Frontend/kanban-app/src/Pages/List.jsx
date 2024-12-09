import React from 'react';
import Card from './Card';
import './List.css';

const List = ({ title, tasks, onDragStart, onDrop, onEdit, onDelete }) => {
  return (
    <div
      className="board-column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(title)}
    >
      <h3>{title}</h3>
      {tasks.map((task) => (
        <Card
          key={task.id}
          task={task}
          onDragStart={onDragStart}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default List;
