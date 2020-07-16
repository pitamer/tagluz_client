import React from "react";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { withStyles } from "@material-ui/core/styles";

const StyledTimePicker = withStyles({
  root: {
    width: "5.5rem",
    margin: "0.5rem",
  },
})(TimePicker);

function ModalTimeRangePicker(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <StyledTimePicker
        label="Start"
        value={props.shiftStartTime}
        onChange={props.setShiftStartTime}
        minutesStep={5}
      />
      <StyledTimePicker
        label="End"
        value={props.shiftEndTime}
        onChange={props.setShiftEndTime}
        minutesStep={5}
      />
    </MuiPickersUtilsProvider>
  );
}

export default ModalTimeRangePicker;
