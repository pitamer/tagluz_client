import { action, thunk } from "easy-peasy";
import * as dateFns from "date-fns";

const host = "tagluz.azurewebsites.net";

const model = {
  data: [],

  setData: action((state, data) => {
    state.data = data;
    // console.log(data)
  }),

  fetchData: thunk(async (actions) => {
    const res = await fetch(`https://${host}/days/getAll`);
    const data = await res.json();
    actions.setData(data);
  }),

  loggedUser: {},

  setLoggedUser: action((state, loggedUser) => {
    state.loggedUser = loggedUser;
  }),

  fetchLoggedUser: thunk(async (actions, payload) => {
    const res = await fetch(`https://${host}/users/getUser/${payload}`);
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
    const res = await fetch(`https://${host}/days/addShift`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const updatedData = await res.json();
    actions.setData(updatedData);
  }),

  addMessage: thunk(async (actions, payload) => {
    const res = await fetch(`https://${host}/days/addMessage`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const updatedData = await res.json();
    actions.setData(updatedData);
  }),

  delShift: thunk(async (actions, payload) => {
    const res = await fetch(`https://${host}/days/deleteShift`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const updatedData = await res.json();
    actions.setData(updatedData);
  }),
};

export default model;
