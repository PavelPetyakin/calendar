export const initialState: ICalendarState = {
  bufferId: 10,
  date: new Date(),
  events: ["2021-1-22", "2021-1-23", "2021-1-24", "2021-1-25", "2021-1-26"],
  notes: {
    "2021-1-22": [
      {
        title: "event 1",
        id: 1,
        participants: "participants 1",
        description: "description 1",
      },
      {
        title: "event 2",
        id: 2,
        participants: "participants 2",
        description: "description 2",
      },
    ],
    "2021-1-23": [
      {
        title: "event 1",
        id: 3,
        participants: "participants 1",
        description: "description 1",
      },
      {
        title: "event 2",
        id: 4,
        participants: "participants 2",
        description: "description 2",
      },
    ],
    "2021-1-24": [
      {
        title: "event 1",
        id: 5,
        participants: "participants 1",
        description: "description 1",
      },
      {
        title: "event 2",
        id: 6,
        participants: "participants 2",
        description: "description 2",
      },
    ],
    "2021-1-25": [
      {
        title: "event 1",
        id: 7,
        participants: "participants 1",
        description: "description 1",
      },
      {
        title: "event 2",
        id: 8,
        participants: "participants 2",
        description: "description 2",
      },
    ],
    "2021-1-26": [
      {
        title: "event 1",
        id: 9,
        participants: "participants 1",
        description: "description 1",
      },
      {
        title: "event 2",
        id: 10,
        participants: "participants 2",
        description: "description 2",
      },
    ]
  }
}

export interface ICalendarState {
  bufferId: number;
  date: Date;
  events: string[];
  notes: INotes;
}

export interface INotes {
  [key: string]: IDayEvent[];
}

export interface IDayEvent {
  title: string;
  id: number;
  participants: string;
  description: string;
}
