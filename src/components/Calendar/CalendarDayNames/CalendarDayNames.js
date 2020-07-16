import React from "react";

import "./index.css";

function CalendarDayNames() {
  const dayNames = [];
  for (let dayName of ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]) {
    dayNames.push(
      <div className="col col-center" key={dayName}>
        {dayName}
      </div>
    );
  }

  return <div className="days row">{dayNames}</div>;
}

export default CalendarDayNames;
