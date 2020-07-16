import React from "react";
import * as dateFns from "date-fns";
import { useStoreState, useStoreActions } from "easy-peasy";

import MonthNavArrow from "./MonthNavArrow";

import "./index.css";

function CalendarHeader() {
  const currentMonth = useStoreState((state) => state.currentMonth);
  const prevMonth = useStoreActions((actions) => actions.prevMonth);
  const nextMonth = useStoreActions((actions) => actions.nextMonth);

  const dateFormat = "MMMM yyyy";
  return (
    <div className="header row flex-middle">
      <MonthNavArrow
        place="start"
        direction="left"
        action={() => prevMonth(currentMonth)}
      />
      <div className="col col-center">
        <span>{dateFns.format(currentMonth, dateFormat)}</span>
      </div>
      <MonthNavArrow
        place="end"
        direction="right"
        action={() => nextMonth(currentMonth)}
      />
    </div>
  );
}

export default CalendarHeader;
