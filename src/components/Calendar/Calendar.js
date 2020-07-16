import React, { /*useEffect*/ } from "react";
// import { useStoreActions } from "easy-peasy";

import CalendarHeader from "./CalendarHeader/CalendarHeader";
import CalendarDayNames from "./CalendarDayNames/CalendarDayNames";
import CalendarDayCells from "./CalendarDayCells/CalendarDayCells";

import "./index.css";

function Calendar() {

  // const fetchData = useStoreActions(actions => actions.fetchData);

  // useEffect(() => {
  //   fetchData();
  //   // eslint-disable-next-line
  // }, []);

  return (
    <div className="calendar">
      <CalendarHeader />
      <CalendarDayNames />
      <CalendarDayCells />
    </div>
  );
}

export default Calendar;
