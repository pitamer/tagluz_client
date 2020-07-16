import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import * as dateFns from "date-fns";

import DayNotifier from "./DayNotifier";
import DayModal from "./DayModal/DayModal";

import "./index.css";

function DayCell(props) {
  const selectedDate = useStoreState((state) => state.selectedDate);
  const onSelectDate = useStoreActions((actions) => actions.onSelectDate);
  const loggedUser = useStoreState((state) => state.loggedUser);

  const [isModalOpen, setModalOpen] = React.useState(false);

  const dayShifts = props.dayData === undefined ? [] : props.dayData.shifts;
  const dayAlerts = props.dayData === undefined ? [] : props.dayData.alerts;
  const dayMessages = props.dayData === undefined ? [] : props.dayData.messages;

  const dayWorkers = dayShifts.map((shift) => shift.user);
  const dayColor = getDayColor()

  const dayFormattedMessages = dayMessages.map(
    (message) => `${message.user}: ${message.content}`
  );

  function onDateClick(day) {
    if (dateFns.isSameDay(day, selectedDate)) {
      setModalOpen(true);
    } else {
      onSelectDate(day);
    }
  }

  function getCellClassName() {
    return !dateFns.isSameMonth(props.day, props.monthStart)
      ? "disabled"
      : dateFns.isSameDay(props.day, props.selectedDate)
      ? "selected"
      : null;
  }

  function getExistingShiftForUser() {
    for (let shift of dayShifts) {
      if (shift.user === loggedUser.name) {
        return shift;
      }
    }
    return [];
  }

  function getDayColor() {
    const shift = getExistingShiftForUser();
    return shift.isAllDay === undefined
      ? null
      : shift.isAllDay
      ? "yellow"
      : "green";
  }

  function getDayNotifiers() {
    function getDayMessagesNotifier() {
      return dayMessages.length < 1 ? null : (
        <DayNotifier icon="textsms" items={dayFormattedMessages} key="m" />
      );
    }
    function getDayAlertsNotifier() {
      return dayAlerts.length < 1 ? null : (
        <DayNotifier icon="report" items={dayAlerts} key="a" />
      );
    }
    return props.dayData === undefined
      ? null
      : [getDayMessagesNotifier(), getDayAlertsNotifier()];
  }

  return (
    <>
      <div
        className={`col cell ${getCellClassName()}`}
        onClick={() => onDateClick(dateFns.toDate(props.day))}
      >
        <span className={`number ${dayColor}`}>
          {props.formattedDate}
        </span>
        <span className="bg">{props.formattedDate}</span>
        <div className="notifiers-area">{getDayNotifiers()}</div>
      </div>
      <DayModal
        day={props.day}
        isModalOpen={isModalOpen}
        onModalClose={() => setModalOpen(false)}
        dayFormattedMessages={dayFormattedMessages}
        dayWorkers={dayWorkers}
        dayAlerts={dayAlerts}
        userShift={getExistingShiftForUser()}
        dayColor={dayColor}
      />
    </>
  );
}

export default DayCell;
