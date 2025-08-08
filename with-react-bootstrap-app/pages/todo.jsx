import React, { useEffect, useState } from 'react';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:5000/api/todos', {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(setTasks)
      .catch(console.error);
  }, [token]);

  function addTask() {
    if (!text.trim()) return;
    fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ text })
    })
      .then(res => res.json())
      .then(newTask => {
        setTasks([...tasks, newTask]);
        setText('');
      });
  }

  function toggleCompleted(id) {
    fetch(`http://localhost:5000/api/todos/${id}/toggle`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(updatedTask => {
        setTasks(tasks.map(t => (t._id === id ? updatedTask : t)));
      });
  }

  function deleteTask(id) {
    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(() => {
      setTasks(tasks.filter(t => t._id !== id));
    });
  }

  // Ici le JSX retourné (interface utilisateur)
  return (
    <div>
      <h2>Todo List</h2>
      <input 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="Enter a task" 
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => toggleCompleted(task._id)} 
            />
            {task.text}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;