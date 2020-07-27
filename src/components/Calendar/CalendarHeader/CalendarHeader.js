import React from "react";
import Grid from "@material-ui/core/Grid";
import * as dateFns from "date-fns";
import { useStoreState, useStoreActions } from "easy-peasy";

import { makeStyles } from "@material-ui/core/styles";

// import MonthNavArrow from "./MonthNavArrow";

import "./index.css";

function CalendarHeader() {
  const currentMonth = useStoreState((state) => state.currentMonth);
  const prevMonth = useStoreActions((actions) => actions.prevMonth);
  const nextMonth = useStoreActions((actions) => actions.nextMonth);

  const dateFormat = "MMMM yyyy";

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      textAlign: "center",
      // display: 'flex'
    },
    item: {
      justifyContent: "center",
      // textAlign: "center",
      display: "flex",
    },
  }));

  const classes = useStyles();

  return (
    <div className={`header ${classes.root}`}>
      <Grid container spacing={3}>
        <Grid item xs>
          <div
            className={`icon ${classes.item}`}
            onClick={() => prevMonth(currentMonth)}
          >
            chevron_left
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={`header-title`}>
            <span>{dateFns.format(currentMonth, dateFormat)}</span>
          </div>
        </Grid>
        <Grid item xs>
          <div
            className={`icon ${classes.item}`}
            onClick={() => nextMonth(currentMonth)}
          >
            chevron_right
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default CalendarHeader;
