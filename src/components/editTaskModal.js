import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function EditTaskModal({ task, getTaskData}) {
  const [formValue, setFormValue] = useState({ taskName: '', taskInfo: '' });
  const modalRef = useRef();

  const handelInput = (inputEvent) => {
    setFormValue({ ...formValue, [inputEvent.target.name]: inputEvent.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {taskName: formValue.taskName, taskInfo: formValue.taskInfo, taskId: task.taskId};
    
    try {
      const res = await axios.put("http://localhost/reactcrudphp/api/tasks.php", formData)

      // hide modal
      const bootstrapModal = window.bootstrap.Modal.getInstance(modalRef.current);
      bootstrapModal.hide();
      
      // refresh data
      getTaskData();

    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  useEffect(() => {
    if (task) {
      setFormValue({
        taskName: task.taskName,
        taskInfo: task.taskInfo,
      });
    }
  }, [task]);

  return (
    <div className="modal" id="editTaskModal" ref={modalRef}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h4 className="modal-title">Edit the task</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <label htmlFor="taskName">Task Name</label>
              <input 
                className="form-control mb-2" 
                type="text" 
                value={formValue.taskName} 
                name="taskName" 
                onChange={handelInput} 
              />
              <label htmlFor="taskInfo">Task Info</label>
              <textarea 
                className="form-control mb-2" 
                value={formValue.taskInfo} 
                name="taskInfo" 
                onChange={handelInput} 
              />
              <input className="mt-2 form-control btn btn-info" type="submit" value="Update"/>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;
