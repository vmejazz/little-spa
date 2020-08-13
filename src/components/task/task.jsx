import React from 'react';

const Task = (props) => {
  const {time, description, id, timeLine, deleteTask, changeTask} = props;

  return (
    <li 
      className={`task ${timeLine ? `task--passed` : ``}`}
      onClick={() => {
        changeTask(time, description, id)
        deleteTask(id)
      }}
    >
      <p>{time}</p>
      <p>{description}</p>
      <button 
        className="button__delete"
        onClick={(evt) => 
          {
            evt.stopPropagation();
            deleteTask(id)
          }
        }
      >
        X
      </button>
    </li>
  );
};

export default Task;