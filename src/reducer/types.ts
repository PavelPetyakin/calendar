export const initialState: ICalendarState = {
  bufferId: 2,
  date: new Date(),
  events: ["2021-1-1", "2021-1-7"],
  notes: {
    "2021-1-1": [
      {
        title: "Новый год",
        id: 1,
        participants: "Друзья",
        description: "",
      }
    ],
    "2021-1-7": [
      {
        title: "Рождество",
        id: 2,
        participants: "Семья",
        description: "",
      }
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
