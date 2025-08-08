// TodoList.jsx
import React, { useState } from 'react';
import TodoItem from '../components/TodoItem';

function TodoList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Check WebSite',
      completed: false
    },

  ]);

  const [text, setText] = useState('');

  function addTask(text) {
    if (text.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setText('');
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  return (
    <div className="todo-list">
      <h2>Todo List</h2>

      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      ))}

      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={() => addTask(text)}>Add</button>
    </div>
  );
}

export default TodoList;
