import React, { useState, useEffect, useRef } from "react";
import TaskCard from "./components/TaskCard";
import axios from 'axios';
import './style.css';

function App() {
  const [formValue, setFormValue] = useState({ taskName: '', taskInfo: '' });
  const [taskData, setTaskData] = useState([]);
  const modalRef = useRef(); 

  const handelInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { taskName: formValue.taskName, taskInfo: formValue.taskInfo };
    const res = await axios.post("http://localhost/reactcrudphp/api/tasks.php", formData);

    if (res.data.succes) {
      const modalElement = modalRef.current;
      const bootstrapModal = window.bootstrap.Modal.getInstance(modalElement);
      bootstrapModal.hide();
      
      getTaskData();
    }
  }

  const getTaskData = async () => {
    const reqData = await fetch("http://localhost/reactcrudphp/api/tasks.php");
    const resData = await reqData.json();
    console.log(resData);
    setTaskData(resData); 
  }

  useEffect(() => {
    getTaskData();
  }, []);

  return (
    <div className="App">
      <h1>Welcome to todolist</h1>
      
      
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTaskModal">
        Add task
      </button>

      

      <div className="taskcontainer">
        {
          taskData.map((task, index) => (
            <TaskCard taskName={task.taskName} taskInfo={task.taskInfo} />
          ))
        }
      </div>
      
      {/* modal */}
      <div className="modal" id="addTaskModal" ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Add a task</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <label htmlFor="taskName">Taskname</label>
                <input className="form-control mb-2" type="text" value={formValue.taskName} name="taskName" onChange={handelInput}></input>
                <label htmlFor="taskInfo">Add information to your task</label>
                <textarea className="form-control mb-2" type="textfield" value={formValue.taskInfo} name="taskInfo" onChange={handelInput}></textarea>
                <input className="mt-2 form-control btn btn-success" type="submit"></input>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>

            
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
