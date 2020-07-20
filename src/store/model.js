import { action, thunk } from "easy-peasy";
import * as dateFns from "date-fns";

const model = {
  data: [],

  setData: action((state, data) => {
    state.data = data;
  }),

  fetchData: thunk(async (actions) => {
    const res = await fetch("http://localhost:8080/days/getAll");
    const data = await res.json();
    actions.setData(data);
  }),

  loggedUser: {},

  setLoggedUser: action((state, loggedUser) => {
    state.loggedUser = loggedUser;
  }),

  fetchLoggedUser: thunk(async (actions, payload) => {
    const res = await fetch(`http://localhost:8080/users/getUser/${payload}`);
    const userData = await res.json();
    actions.setLoggedUser(userData);
  }),

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

  addShift: thunk(async (actions, payload) => {
    const res = await fetch(`http://localhost:8080/days/addShift`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const updatedData = await res.json();
    actions.setData(updatedData);
  }),

  addMessage: thunk(async (actions, payload) => {
    const res = await fetch(`http://localhost:8080/days/addMessage`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const updatedData = await res.json();
    actions.setData(updatedData);
  }),

  delShift: thunk(async (actions, payload) => {
    const res = await fetch(`http://localhost:8080/days/deleteShift`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const updatedData = await res.json();
    actions.setData(updatedData);
  }),
};

export default model;
