import React from "react";
import Grid from "@material-ui/core/Grid";
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
    <div className="header">
      <Grid container spacing={3.5}>
        <Grid item xs>
          <MonthNavArrow
            direction="left"
            action={() => prevMonth(currentMonth)}
          />
        </Grid>
        <Grid item xs={6}>
          <div className="col-center header-title">
            <span>{dateFns.format(currentMonth, dateFormat)}</span>
          </div>
        </Grid>
        <Grid item xs>
          <MonthNavArrow
            direction="right"
            action={() => nextMonth(currentMonth)}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default CalendarHeader;
