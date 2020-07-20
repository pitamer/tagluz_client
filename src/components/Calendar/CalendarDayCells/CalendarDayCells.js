import React from "react";
import { useStoreState } from "easy-peasy";
import * as dateFns from "date-fns";

import DayCell from "./DayCell/DayCell";

import './index.css'

function CalendarDayCells() {
  const currentMonth = useStoreState((state) => state.currentMonth);
  const selectedDate = useStoreState((state) => state.selectedDate);
  const data = useStoreState((state) => state.data);
  // console.log(data)

  const monthStart = dateFns.startOfMonth(currentMonth);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows = [];

  let days = [];
  let day = startDate;

  function getDayData(day) {
    for (let dbDay of data) {
      if (dateFns.isSameDay(dateFns.parseISO(dbDay.date), day)) {
        return dbDay;
      }
    }
  }

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      let formattedDate = dateFns.format(day, dateFormat);
      days.push(
        <DayCell
          key={day}
          day={day}
          dayData={getDayData(day)}
          monthStart={monthStart}
          selectedDate={selectedDate}
          formattedDate={formattedDate}
        />
      );
      day = dateFns.addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
}

export default CalendarDayCells;
