import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';

// components

function TaskCard({ task, onEditClick, getTaskData }) {
  
  const [message, setMessage] = useState('');
  
  const handleDelete = async (taskId) => {
    try {
      const res = await axios.delete(`http://localhost/reactcrudphp/api/tasks.php?taskId=${taskId}`);
      setMessage(res.data.message);
      getTaskData(); // Refresh the task list after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  
  


  return (
    <>
      <div className="taskcard">
        <p>{message}</p>
        <div className='taskHeader'>
          <button
            className='btn btn-info'
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#editTaskModal"
            onClick={onEditClick}
          >
            Edit
          </button>
          <h3>{task.taskName}</h3>
          <button
            onClick={() => handleDelete(task.taskId)}
            className='btn btn-danger'
          >
            X - {task.taskId}
          </button>
        </div>
        <h5>{task.taskInfo}</h5>
      </div>  
    </>
  );
}

export default TaskCard;
