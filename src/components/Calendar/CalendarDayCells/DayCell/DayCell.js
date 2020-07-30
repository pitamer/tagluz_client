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

  ///////////////////////////////////////////////////////
  // console.log(props.dayData)
  // if (dateFns.isFirstDayOfMonth(props.day)) {
  //   console.log(localStorage.getItem('username'))
  //   console.log(loggedUser)
  // }

  const [isModalOpen, setModalOpen] = React.useState(false);

  const dayShifts = props.dayData === undefined ? [] : props.dayData.shifts;
  const dayAlerts = props.dayData === undefined ? [] : props.dayData.alerts;
  const dayMessages = props.dayData === undefined ? [] : props.dayData.messages;

  const userShift = dayShifts.find((shift) => shift.user === loggedUser.name);
  const dayColor =
    userShift === undefined ? null : userShift.isAllDay ? "yellow" : "green";

  const cellClassName = !dateFns.isSameMonth(props.day, props.monthStart)
    ? "disabled"
    : dateFns.isSaturday(props.day)
    ? "closed"
    : dateFns.isSameDay(props.day, props.selectedDate)
    ? "selected"
    : null;

  function minutesWithLeadingZeros(dt) {
    return (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes();
  }
  function hoursWithLeadingZeros(dt) {
    return (dt.getHours() < 10 ? "0" : "") + dt.getHours();
  }

  const dayFormattedWorkers = dayShifts.map((shift) =>
    `${shift.user} | ` + (shift.isAllDay === true
      ? `[שעות גמישות]`
      : `${hoursWithLeadingZeros(
          new Date(shift.startTime)
        )}:${minutesWithLeadingZeros(
          new Date(shift.startTime)
        )} - ${hoursWithLeadingZeros(
          new Date(shift.endTime)
        )}:${minutesWithLeadingZeros(
          new Date(shift.endTime)
        )}`)
  ).sort((item) => {
    return item.includes(`ש`)
  });

  const dayFormattedMessages = dayMessages.map(
    (message) => `${message.user}: ${message.content}`
  );

  const messagesNotifier =
    dayMessages.length < 1 ? null : (
      <DayNotifier icon="textsms" items={dayFormattedMessages} key="m" />
    );
  const alertsNotifier =
    dayAlerts.length < 1 ? null : (
      <DayNotifier icon="report" items={dayAlerts} key="a" />
    );
  const dayNotifiers =
    props.dayData === undefined ? null : [messagesNotifier, alertsNotifier];

  function onDateClick(day) {
    if (dateFns.isSameDay(day, selectedDate)) {
      setModalOpen(true);
    } else {
      onSelectDate(day);
    }
  }

  return (
    <>
      <div
        className={`col cell ${cellClassName}`}
        onClick={() => onDateClick(dateFns.toDate(props.day))}
      >
        <span className={`number ${dayColor}`}>{props.formattedDate}</span>
        <span className="bg">{props.formattedDate}</span>
        <div className="notifiers-area">{dayNotifiers}</div>
      </div>
      <DayModal
        day={props.day}
        isModalOpen={isModalOpen}
        onModalClose={() => setModalOpen(false)}
        dayFormattedMessages={dayFormattedMessages}
        dayFormattedWorkers={dayFormattedWorkers}
        dayAlerts={dayAlerts}
        userShift={userShift}
        dayColor={dayColor}
      />
    </>
  );
}

export default DayCell;
