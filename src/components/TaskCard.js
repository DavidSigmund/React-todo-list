import React, {useState} from 'react';
import axios from 'axios';
import '../style.css';

function TaskCard({task}) {
    const [message, setMessage] = useState('');

    const handleDelete = async (taskId) => {
        const res = await axios.delete(`http://localhost/reactcrudphp/api/tasks.php?taskId=${taskId}`);
        setMessage(res.data.message);
    }
    

    return (<>
        <div className="taskcard">
            <p>{message}</p>
            <div className='taskHeader'>
                <button className='btn btn-info' type="button" data-bs-toggle="modal" data-bs-target="#editTaskModal">...</button>
                <h3>{task.taskName}</h3>
                <button onClick={() => handleDelete(task.taskId)} className='btn btn-danger'>X  - {task.taskId}</button>
            </div>
            <h5>{task.taskInfo}</h5>
        </div>
    </>);
}
export default TaskCard;