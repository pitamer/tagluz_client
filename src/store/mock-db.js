// const data =
// [{
//   _id: '1234567890',
//   date: new Date('2020.06.17'),
//   shifts: [],
//   messages: [],
//   alerts: []
// }];

// Days.find({date: 2020/07/18})

const data = [
  {
    date: new Date("2020-06-17"),
    shifts: [
      {
        startTime: 0,
        endTime: 0,
        isAllDay: false,
        user: "pitamar",
      },
    ],
    messages: [
      {
        user: "Talkish",
        content: "Lorem Ipsum Dolor Sit Amet!",
      },
    ],
    alerts: [],
  },
  {
    date: new Date("2020-06-24"),
    shifts: [],
    messages: [],
    alerts: [
      "Lorem Ipsum Dolor Sit Amet!",
      "Lorem Ipsum Dolor Sit Amet AGAIN!",
    ],
  },
  {
    date: new Date("2020-06-29"),
    shifts: [],
    messages: [
      {
        user: "טלקיש",
        content: "ביום זה תהיה ארוחה",
      },
      {
        user: "טלקיש",
        content: "ביום זה תהיה עוד ארוחה",
      },
    ],
    alerts: ["Lorem Ipsum Dolor Sit Amet!"],
  },
  {
    date: new Date("2020-07-29"),
    shifts: [],
    messages: [
      {
        user: "טלקיש",
        content: "ביום זה לא תהיה ארוחה",
      },
      {
        user: "טלקיש",
        content: "כאמור, ביום זה ממש אין ארוחה",
      },
    ],
    alerts: ["Lorem Ipsum Dolor Sit Amet!"],
  },
  {
    date: new Date("2020-07-10"),
    shifts: [
      {
        startTime: 0,
        endTime: 0,
        isAllDay: false,
        user: "pitamar",
      },
      {
        startTime: 0,
        endTime: 0,
        isAllDay: false,
        user: "johny",
      },
      {
        startTime: 0,
        endTime: 0,
        isAllDay: false,
        user: "yossi",
      },
      {
        startTime: 0,
        endTime: 0,
        isAllDay: false,
        user: "anan",
      },
    ],
    messages: [],
    alerts: ["Lorem Ipsum Dolor Sit Amet!", "וואלק בלי שטויות"],
  },
  {
    date: new Date("2020-07-15"),
    shifts: [],
    messages: [],
    alerts: ["DEADLINE HERE"],
  },
  {
    date: new Date("2020-07-12"),
    shifts: [
      {
        startTime: 0,
        endTime: 0,
        isAllDay: true,
        user: "pitamar",
      },
    ],
    messages: [],
    alerts: [],
  },
  {
    date: new Date("2020-07-16"),
    shifts: [
      {
        startTime: 0,
        endTime: 0,
        isAllDay: true,
        user: "pitamar",
      },
    ],
    messages: [],
    alerts: [],
  },
  {
    date: new Date("2020-07-28"),
    shifts: [
      {
        startTime: 0,
        endTime: 0,
        isAllDay: false,
        user: "anan",
      },
    ],
    messages: [],
    alerts: [],
  },
  {
    date: new Date("2020-07-21"),
    shifts: [
      {
        startTime: 0,
        endTime: 0,
        isAllDay: false,
        user: "pitamar",
      },
    ],
    messages: [],
    alerts: [],
  },
];

export default data;
