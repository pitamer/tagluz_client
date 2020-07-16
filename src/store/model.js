import { action /*thunk*/ } from "easy-peasy";
// import mockData from "./mock-data";
import mockData from "./mock-db";
import * as dateFns from "date-fns";

const model = {
  data: mockData,

  // data: [],
  // // https://riccardogiorato.com/garden/2019/react-easy-peasy/
  // setData: action((state, data) => {
  //   state.data = data;
  // }),

  // fetchData: thunk(async actions => {
  //   const res = await fetch(
  //     "http://localhost:8080/days/getAll"
  //   );
  //   const data = await res.json();
  //   actions.setData(data);
  // }),

  loggedUser: {
    name: "pitamar",
    isAdmin: true,
  },

  currentMonth: new Date(),
  selectedDate: new Date(),

  onSelectDate: action((state, day) => {
    state.selectedDate = day;
  }),

  nextMonth: action((state, currentMonth) => {
    state.currentMonth = dateFns.addMonths(currentMonth, 1);
  }),

  prevMonth: action((state, currentMonth) => {
    state.currentMonth = dateFns.subMonths(currentMonth, 1);
  }),

  addShift: action((state, newShiftPayload) => {
    const newShift = newShiftPayload.newShift;
    const day = newShiftPayload.day;

    for (let dbDay of state.data) {
      if (dateFns.isSameDay(dbDay.date, day)) {
        dbDay.shifts = [...dbDay.shifts, newShift];
        return null;
      }
    }
    state.data.push({
      date: day,
      shifts: [newShift],
      messages: [],
      alerts: [],
    });
  }),

  addMessage: action((state, newMessagePayload) => {
    const newMessage = newMessagePayload.newMessage;
    const day = newMessagePayload.day;

    for (let dbDay of state.data) {
      if (dateFns.isSameDay(dbDay.date, day)) {
        dbDay.messages = [...dbDay.messages, newMessage];
        return null;
      }
    }
    state.data.push({
      date: day,
      shifts: [],
      messages: [newMessage],
      alerts: [],
    });
  }),

  delShift: action((state, shiftPayload) => {
    const user = shiftPayload.user;
    const day = shiftPayload.day;

    for (let dbDay of state.data) {
      if (dateFns.isSameDay(dbDay.date, day)) {
        dbDay.shifts = dbDay.shifts.filter((shift) => shift.user !== user);
      }
    }
  }),
};

export default model;
