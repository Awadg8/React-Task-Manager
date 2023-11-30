import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddTaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName) {
      alert('Task name is required!');
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      priority,
      completed: false,
    };

    // Fetch existing tasks from local storage
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = [...existingTasks, newTask];

    // Save updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Navigate to task list page
    navigate('/');
  };

  return (
    <div className="main-container">
      <div className="background-container">
      <header className="mb-4 text-center task-manager-header ">
          <h1 className="font-weight-bold">Task Manager</h1>
        </header>
        <div className="todo-app" style={{ background: '#F0E68C', padding: '20px', borderRadius: '8px' }}>
          <h1 className="mb-4">Add Task</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Task Name:</label>
              <input
                type="text"
                className="form-control"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Task Description:</label>
              <textarea
                className="form-control"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Priority:</label>
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Add Task</button>
          </form>
          <Link to="/" className="btn btn-secondary mt-3">Back to Task List</Link>
        </div>
        <footer className="mt-4 text-center task-manager-footer">
          <p>&copy; 2023 All Right Reserved @Awadhesh Gupta</p>
        </footer>
      </div>
    </div>
  );
};

export default AddTaskForm;
