import React, {useState} from 'react';
import Task from '../task/task';

const Tasks = (props) => {
  const {tasksList = [], setTask, activeDay, deleteTask, setDragDropActivate, taskId, setTaskId} = props
  const [newTime, setNewTime] = useState(``);
  const [newTask, setNewTask] = useState(``);

  let inputTime;
  let inputDescription;

  const showTasks = tasksList.filter(item => item.dayOfWeek === activeDay);
  if (showTasks.length > 1) {
    showTasks.sort((a,b) => {
      if (a.time > b.time) {
        return 1;
      }
      if (a.time < b.time) {
        return -1;
      }
      return 0;
    })
  }

  const initialInputFields = () => {
    inputTime = document.querySelector('.input__time');
    inputDescription = document.querySelector('.input__description');
  }

  const changeCursorStyle = () => {
    document.querySelector('body').style.cursor = 'grabbing';
  }

  const changeTask = (time, description) => {
    initialInputFields();
    inputTime.value = time;
    inputDescription.value = description;
    setNewTime(time);
    setNewTask(description);
  }

  const clearInputField = () => {
    changeTask('','');
  }

  const checkTaskTime = (time, day) => {
    const today = new Date();
    let todayDayOfWeek = today.getDay();
    if (day === 0) {
      day = 7;
    }
    if (todayDayOfWeek === 0) {
     todayDayOfWeek = 7;
    }
    if (day > todayDayOfWeek) {
      return false;
    } else if (day < todayDayOfWeek) {
      return true;
    } else {
      let taskTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      taskTime.setHours(time.slice(0, 2), time.slice(3, 5));
      return today > taskTime;
    }
  }

  const addNewTask = () => {
    if (!newTask || !newTime) {
      alert(`Заполнены не все поля`)
      return
    }
   
    setTaskId(taskId + 1);

    let newTaskList = tasksList.concat(
      {
        taskId: taskId,
        time:newTime,
        description: newTask,
        dayOfWeek: activeDay,
      }
    );
    
    setTask(newTaskList);
    clearInputField();
  }

  return (
   <div className="tasks-block">
    <button 
      className="button__close"
      onMouseDown={() => {
        setDragDropActivate(true)
        changeCursorStyle()
      }}
    >
      *
    </button>
    <ul className="tasks__list">
      {
        showTasks.map((item, index) => {
          return (
            <Task 
              key={index}
              time={item.time}
              description={item.description}
              deleteTask={deleteTask}
              id={item.taskId}
              timeLine={checkTaskTime(item.time, item.dayOfWeek)}
              changeTask={changeTask}
            /> 
          )
        })
      }
    </ul>
    <div className="input__field">
      <input 
        type="time" 
        className="input__time"
        onChange={(evt) => setNewTime(evt.target.value)}
      />
      <input 
        type="text" 
        className="input__description"
        onChange={(evt) => setNewTask(evt.target.value)}
      />
      <button 
        className="button__add-task" 
        onClick={() => addNewTask()}
      >
        +
      </button>
    </div>
  </div>

  );
};

export default Tasks;