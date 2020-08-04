import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import * as dateFns from "date-fns";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ModalTimeRangePicker from "./ModalTimeRangePicker";
import ModalNotifier from "./ModalNotifier";

import "./index.css";

function DayModal(props) {
  const dateFormat = "EEEE, MMMM d";
  const modalTitle = dateFns.format(props.day, dateFormat);
  const userHasShift = props.userShift !== undefined;

  React.useEffect(() => {
    setShiftStartTime(
      userHasShift ? props.userShift.startTime : props.day.setHours(8)
    );
    setShiftEndTime(
      userHasShift ? props.userShift.endTime : props.day.setHours(16)
    );
    // eslint-disable-next-line
  }, [userHasShift]);

  const loggedUser = useStoreState((state) => state.loggedUser);
  const addShift = useStoreActions((actions) => actions.addShift);
  const delShift = useStoreActions((actions) => actions.delShift);
  const addMessage = useStoreActions((actions) => actions.addMessage);

  const [shiftStartTime, setShiftStartTime] = React.useState(null);
  const [shiftEndTime, setShiftEndTime] = React.useState(null);
  const [messageValue, setMessageValue] = React.useState("");
  const [altUsernameValue, setAltUsernameValue] = React.useState("");

  const DisplayAdminUtils = loggedUser.isAdmin ? "" : "none";
  const DisplayDelShift = userHasShift ? "" : "none";
  const DisplayReserveDay = !userHasShift ? "" : "none";
  const DisplaySave =
    !userHasShift || messageValue.length > 0 || altUsernameValue.length > 0
      ? ""
      : "none";

  const dayForDB = props.day.setHours(8);
  // This was the source of much frustration. It's a
  // quirky solution, but it solves the timezone communication
  // problems with the DB without too much extra work.

  function handleReserveDay() {
    const newShiftPayload = {
      day: dayForDB,
      newShift: {
        // use altUsernameValue for user, if not empty
        user: altUsernameValue === "" ? loggedUser.name : altUsernameValue,
        startTime: shiftStartTime,
        endTime: shiftEndTime,
        isAllDay: true,
      },
    };
    addShift(newShiftPayload);
    setAltUsernameValue("");
    props.onModalClose();
  }

  function saveModalInput() {
    if (messageValue.length < 1) {
      // addShift if nothing in message textfield
      const newShiftPayload = {
        day: dayForDB,
        newShift: {
          // use altUsernameValue for user, if not empty
          user: altUsernameValue === "" ? loggedUser.name : altUsernameValue,
          startTime: shiftStartTime,
          endTime: shiftEndTime,
          isAllDay: false,
        },
      };
      addShift(newShiftPayload);
      setAltUsernameValue("");
      props.onModalClose();
    } else {
      // addMessage if anything in message textfield
      const newMessagePayload = {
        day: dayForDB,
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
      day: dayForDB,
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
        <ModalNotifier icon="people_alt" items={props.dayFormattedWorkers} />
        <hr />
        <div style={{ display: DisplayReserveDay }}>
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
          <Button
            onClick={handleDelShift}
            fullWidth
            variant="contained"
            disableElevation
          >
            <span className={`icon`}>delete</span>Delete shift
          </Button>
        </div>
        <div style={{ display: DisplayAdminUtils }}>
          <TextField
            id="name"
            type="name"
            label="Add a Message"
            value={messageValue}
            onChange={(event) => {
              setMessageValue(event.target.value);
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <div style={{ display: DisplaySave }}>
          <TextField
            label="As User..."
            type="username"
            id="username"
            size="small"
            margin="dense"
            color="secondary"
            variant="outlined"
            value={altUsernameValue}
            onChange={(event) => {
              setAltUsernameValue(event.target.value);
            }}
            style={{
              display: DisplayAdminUtils,
              width: "8.5em",
              marginBottom: "0.5em",
            }}
          />
          <Button
            onClick={saveModalInput}
            color="primary"
            variant="contained"
            style={{
              margin: "0.65em 1em 0.65em 0.5em",
              background: "var(--main-color)",
            }}
          >
            save
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default DayModal;
