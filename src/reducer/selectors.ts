import { ICalendarState, INotes } from "./types";

export const getBufferId = (state: ICalendarState): number => state.bufferId;

export const getDate = (state: ICalendarState): Date => state.date;

export const getEvents = (state: ICalendarState): string[] => state.events;

export const getNotes = (state: ICalendarState): INotes => state.notes;
