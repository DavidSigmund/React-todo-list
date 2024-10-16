import React, { useState, useEffect } from "react";
import axios from 'axios';
import './style.css';

// components
import TaskCard from "./components/TaskCard";
import AddTaskModal from "./components/addTaskModal";
import EditTaskModal from "./components/editTaskModal";

function App() {
  const [taskData, setTaskData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null) 
  
  const getTaskData = async () => {
    const reqData = await fetch("http://localhost/reactcrudphp/api/tasks.php");
    const resData = await reqData.json();
    setTaskData(resData); 
  };


  useEffect(() => {
    getTaskData();
  }, []);


  const handleEditClick = (task) => {
    setSelectedTask(task)
    console.log(task)
  }

  return (
    <div className="App">
      <h1>Welcome to todolist</h1>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTaskModal">
        Add task
      </button>

      <AddTaskModal getTaskData={getTaskData} />
      <EditTaskModal task={selectedTask} getTaskData={getTaskData}/>

      <div className="taskcontainer">
        {taskData.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            getTaskData={getTaskData}
            onEditClick={() => handleEditClick(task)}
          />
        ))}
      </div>

    </div>
  );
}

export default App;