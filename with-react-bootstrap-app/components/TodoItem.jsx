// components/TodoItem.jsx
import React from 'react';

function TodoItem({ task, deleteTask, toggleCompleted }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
      }}
    >
      <span
        onClick={() => toggleCompleted(task.id)}
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          flex: 1,
          cursor: 'pointer',
        }}
      >
        {task.text}
      </span>
      <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '10px' }}>
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
