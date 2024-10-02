import '../style.css';

function TaskCard({taskName, taskInfo}) {
    return (<>
        <div className="taskcard">
            <h3>{taskName}</h3>
            <h5>{taskInfo}</h5>
        </div>
    </>);
}
export default TaskCard;