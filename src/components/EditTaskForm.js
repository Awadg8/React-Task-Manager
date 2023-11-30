import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditTaskForm = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({});
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tasks from local storage on component mount
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const selectedTask = storedTasks.find(task => task.id === parseInt(taskId, 10));
    setTask(selectedTask);
    setTaskName(selectedTask.name);
    setTaskDescription(selectedTask.description);
    setPriority(selectedTask.priority);
    
  }, [taskId]);

  

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      name: taskName,
      description: taskDescription,
      priority,
    };

    // Fetch existing tasks from local storage
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = existingTasks.map(t => (t.id === task.id ? updatedTask : t));

    // Save updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Navigate to task list page
    navigate('/');
  };

  return (
    <div className="main-container">
      <div className="background-container">
      <header className="mb-4 text-center task-manager-header">
          <h1 className="font-weight-bold ">Task Manager</h1>
        </header>
        <div className="todo-app" style={{ background: '#87CEEB', padding: '20px', borderRadius: '8px' }}>
          <h1 className="mb-4 text-center">Edit Task</h1>
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
            <div className="d-flex justify-content-center mt-3">
              <button type="submit" className="btn btn-primary mx-2">Save Changes</button>
              <Link to="/" className="btn btn-secondary mx-2">Back to Task List</Link>
            </div>
          </form>
        </div>
        <footer className="mt-4 text-center task-manager-footer">
          <p>&copy; 2023 All Right Reserved @Awadhesh Gupta</p>
        </footer>
      </div>
    </div>
  );
};

export default EditTaskForm;
