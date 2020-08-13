import React, {useState} from 'react';
import WeekDays from '../week-days/week-days';
import Tasks from '../tasks/tasks';
import {reactLocalStorage} from 'reactjs-localstorage';

const dayToday = new Date();
const dayOfWeek = dayToday.getDay();

const Main = () => {
  const [activeDayOfWeek, setActiveDayOfWeek] = useState(dayOfWeek);
  const [tasksList, setTask] = useState(reactLocalStorage.getObject('taskStore'));
  const [dragDropActivate, setDragDropActivate] = useState(false);

  const checkMaxId = () => {
    if (tasksList.length < 2) {
      return undefined;
    }
    return tasksList.reduce((prev, cur) => {
      if (prev.taskId > cur.taskId) {
        return prev.taskId + 1
      }
      return cur.taskId + 1;
    });
  }
  let taskIdPrev = checkMaxId() || 1;
  const [taskId, setTaskId] = useState(taskIdPrev);

  function updateTasksList(taskArray) {
    setTask(taskArray);
    reactLocalStorage.setObject('taskStore', taskArray);
  }

  function deleteTask(id) {
    const filtredTasks = tasksList.filter((item) => {
      return item.taskId !== id
    })
    updateTasksList(filtredTasks);
  }

  const mouseOveronDay = (evt) => {
    const newDay = parseInt(evt.target.id, 10);
    document.removeEventListener('mouseup', mouseOveronDay);
    if (newDay === activeDayOfWeek) {return};
    if (dragDropActivate) {
      const taskListWithoutOld = tasksList.filter((item) => item.dayOfWeek !== newDay);
      let tasksRemoveList = taskListWithoutOld.map((item) => {
        if (item.dayOfWeek === activeDayOfWeek) {
          item.dayOfWeek = parseInt(newDay, 10);
        }
        return item;
      });
      updateTasksList(tasksRemoveList);
      setActiveDayOfWeek(newDay);
    }
  }

  return (
    <div onMouseUp={() => {
      document.querySelector('body').style.cursor = 'default';
      setDragDropActivate(false)
    }}>
      <h1>ToDo Tasks</h1>
      <div className="main-application">
      <Tasks 
        tasksList={tasksList}
        setTask={updateTasksList}
        activeDay={activeDayOfWeek}
        deleteTask={deleteTask}
        setDragDropActivate={setDragDropActivate}
        taskId={taskId}
        setTaskId={setTaskId}
      />
      <WeekDays 
        activeDay={activeDayOfWeek}
        changeDay={setActiveDayOfWeek}
        mouseOveronDay={mouseOveronDay}
      />
      </div>
    </div>
  )
}

export default Main;