import React from 'react';

const WEEK_DAYS_MAP = [
  'вс',
  'пн',
  'вт',
  'ср',
  'чт',
  'пт',
  'сб',
]

const WeekDays = (props) => {
  const { activeDay, changeDay, mouseOveronDay } = props;

  return (
    <ul className="week-days">
      {WEEK_DAYS_MAP.map((item, index) => {
        return (
          <li 
            key={`${item} + ${index}`}
            id={index}
            className={activeDay === index ? `day active` : `day`}
            onClick={() => changeDay(index)}
            onMouseUp={(evt) => mouseOveronDay(evt)}
          >
            {item}
          </li>
        )
      })}   
    </ul>
  )
}

export default WeekDays;