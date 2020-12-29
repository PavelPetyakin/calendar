import { initialState, ICalendarState, INotes } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const calendarState = createSlice({
  name: "calendarState",
  initialState,
  reducers: {
    updateDate: (state: ICalendarState, action: PayloadAction<Date>) => {
      state.date = action.payload;
    },
    addEvent: (state: ICalendarState, action: PayloadAction<string[]>) => {
      return {...state, events: action.payload};
    },
    addNote: (state: ICalendarState, action: PayloadAction<INotes>) => {
      return {...state, notes: action.payload};
    },
  },
});

export const { actions, reducer } = calendarState;
