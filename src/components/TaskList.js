import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from local storage on component mount
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    // Save updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    // Save updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    
    <div className="main-container">
      <div className="background-container">
        <header className="mb-4 text-center task-manager-header ">
          <h1 className="font-weight-bold">Task Manager</h1>
        </header>
        <div className="todo-app" style={{ background: 'black', padding: '20px', borderRadius: '8px' }}>
          <h1 className="mb-4 text-center" style={{color: "white"}}>Tasks List</h1>
          <ul className="list-group">
            {tasks.map(task => (
              <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center todo-row">
                <div>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id)}
                    className="me-3"
                    style={{width: 18, height: 18}}
                  />
                  <span style={{ textDecoration: task.completed ? 'line-through' : 'none', fontSize: 20, fontWeight: "bold" }}>{task.name}</span>
                </div>
                <div>
                  <button onClick={() => handleDelete(task.id)} className="btn btn-danger me-2">Delete</button>
                  <Link to={`/edit/${task.id}`} className="btn btn-primary">Edit</Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-center mt-3">
            <Link to="/add" className="btn btn-success">Add Task</Link>
          </div>
        </div>
        <footer className="mt-4 text-center task-manager-footer">
          <p>&copy; 2023 All Right Reserved @Awadhesh Gupta</p>
        </footer>
      </div>
    </div>
  );
};

export default TaskList;
