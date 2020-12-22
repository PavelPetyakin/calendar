export const initialState: ICalendarState = {
  date: new Date(),
  events: ["2020-12-22"],
  notes: {
    "2020-12-22": [
      {
        title: "event 1",
        time: "12:00",
        participants: "participants 1",
        description: "description 1",
      },
      {
        title: "event 2",
        time: "13:00",
        participants: "participants 2",
        description: "description 2",
      },
    ]
  }
}

export interface ICalendarState {
  date: Date;
  events: string[];
  notes: INotes;
}

export interface INotes {
  [key: string]: IDayEvent[];
}

export interface IDayEvent {
  title: string;
  time: string;
  participants: string;
  description: string;
}
