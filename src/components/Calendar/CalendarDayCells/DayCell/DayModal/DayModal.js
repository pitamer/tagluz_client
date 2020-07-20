import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import * as dateFns from "date-fns";

import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ModalTimeRangePicker from "./ModalTimeRangePicker";
import ModalNotifier from "./ModalNotifier";

import "./index.css";

const DayModal = (props) => {
  const dateFormat = "EEEE, MMMM d";
  const modalTitle = dateFns.format(props.day, dateFormat);

  const [shiftStartTime, setShiftStartTime] = React.useState(
    getShiftTime("startTime")
  );
  const [shiftEndTime, setShiftEndTime] = React.useState(
    getShiftTime("endTime")
  );
  const [messageValue, setMessageValue] = React.useState("");

  const loggedUser = useStoreState((state) => state.loggedUser);
  const addShift = useStoreActions((actions) => actions.addShift);
  const delShift = useStoreActions((actions) => actions.delShift);
  const addMessage = useStoreActions((actions) => actions.addMessage);

  const DisplayAddMessage = loggedUser.isAdmin ? "" : "none";
  const userHasShift = props.userShift.isAllDay !== undefined;
  const DisplayDelShift = userHasShift ? "" : "none";
  const DisplayReserveDay = !userHasShift ? "" : "none";
  const DisplaySave = !userHasShift || messageValue.length > 1 ? "" : "none";

  function getShiftTime(requestedTime) {
    return props.userShift[requestedTime] !== undefined
      ? props.userShift[requestedTime]
      : requestedTime === "startTime"
      ? props.day.setHours(8)
      : props.day.setHours(16);
  }

  function handleReserveDay() {
    const newShiftPayload = {
      day: props.day,
      newShift: {
        user: loggedUser.name,
        startTime: shiftStartTime,
        endTime: shiftEndTime,
        isAllDay: true,
      },
    };
    addShift(newShiftPayload);
    props.onModalClose();
  }

  function saveModalInput() {
    if (messageValue.length < 1) {
      // addShift if nothing in message textfield
      const newShiftPayload = {
        day: props.day,
        newShift: {
          user: loggedUser.name,
          startTime: shiftStartTime,
          endTime: shiftEndTime,
          isAllDay: false,
        },
      };
      addShift(newShiftPayload);
      props.onModalClose();
    } else {
      // addMessage if anything in message textfield
      const newMessagePayload = {
        day: props.day,
        newMessage: {
          user: loggedUser.name,
          content: messageValue,
        },
      };
      addMessage(newMessagePayload);
      setMessageValue("");
    }
  }

  function handleDelShift() {
    const shiftPayload = {
      day: props.day,
      user: props.userShift.user,
    };
    delShift(shiftPayload);
    props.onModalClose();
  }

  return (
    <Dialog
      open={props.isModalOpen}
      onClose={props.onModalClose}
      aria-labelledby="form-dialog-title"
      className="day-modal"
    >
      <DialogTitle id="form-dialog-title">{modalTitle}</DialogTitle>
      <DialogContent>
        <ModalNotifier icon="report" items={props.dayAlerts} />
        <ModalNotifier icon="textsms" items={props.dayFormattedMessages} />
        <ModalNotifier icon="people_alt" items={props.dayWorkers} />
        <hr />
        <div style={{ display: DisplayReserveDay }}>
          <Tooltip arrow placement="top" title="Reserve full day">
            <Button
              onClick={handleReserveDay}
              fullWidth
              variant="contained"
              disableElevation
              style={{
                background: "rgba(255, 255, 0, 0.2)",
                border: "1px lightgrey solid",
              }}
            >
              <span className={`icon`}>bookmark_border</span>Reserve all day
            </Button>
          </Tooltip>
        </div>
        <div className={`time-range-picker ${props.dayColor}`}>
          <ModalTimeRangePicker
            day={props.day}
            shiftStartTime={shiftStartTime}
            setShiftStartTime={setShiftStartTime}
            shiftEndTime={shiftEndTime}
            setShiftEndTime={setShiftEndTime}
          />
        </div>
        <div style={{ display: DisplayDelShift }}>
          <Tooltip arrow placement="top" title="Delete shift">
            <Button
              onClick={handleDelShift}
              fullWidth
              variant="contained"
              disableElevation
            >
              <span className={`icon`}>delete</span>Delete shift
            </Button>
          </Tooltip>
        </div>
        <div style={{ display: DisplayAddMessage }}>
          <TextField
            autoFocus={false}
            id="name"
            label="Add a Message"
            type="name"
            fullWidth
            value={messageValue}
            onChange={(event) => {
              setMessageValue(event.target.value);
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <div style={{ display: DisplaySave }}>
          <Button onClick={saveModalInput} color="primary" size="small">
            save
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default DayModal;
