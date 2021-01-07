import { IDayEvent, INotes } from "./reducer/types";
import { useSelector } from "react-redux";
import { getDate, getEvents, getNotes } from "./reducer/selectors";
import { DependencyList, useEffect, useRef } from "react";
import { addEvent, changeNote, updateBufferId } from "./reducer/actions";
import { Dispatch } from "redux";

export interface IMonthList {
  title: string;
  date: string;
  dayEvents?: IDayEvent[];
}

export function useGetCurrentMonthList(): IMonthList[][] {
  const d: Date = useSelector(getDate);
  const notes: INotes = useSelector(getNotes);

  //Current month
  const currentYear = d.getFullYear();
  const currentMonth = d.getMonth();
  const currentMonthStart = new Date(currentYear, currentMonth, 1).getDay();
  const currentMonthStartAtDay = currentMonthStart === 0 ? 6 : currentMonthStart - 1;
  const currentMonthDaysAmount = new Date(currentYear, currentMonth + 1, 0).getDate();
  const currentMonthArray: IMonthList[] = getDaysOfMonth(currentMonthDaysAmount, currentYear, currentMonth + 1);

  //Prev  month
  const prevMonthDate = new Date(currentYear, currentMonth, 0);
  const prevMonthY = prevMonthDate.getFullYear();
  const prevMonthM = prevMonthDate.getMonth();
  const prevMonthLastDate = prevMonthDate.getDate();
  const startWeekDate: number = prevMonthLastDate - currentMonthStartAtDay;
  const prevMonthArray: IMonthList[] = getDaysOfMonth(currentMonthStartAtDay, prevMonthY, prevMonthM + 1, startWeekDate);

  //Next month
  const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
  const nextMonthY = nextMonthDate.getFullYear();
  const nextMonthM = nextMonthDate.getMonth();
  const nextMonthStart = nextMonthDate.getDay();
  const endMonthStartAtDay = nextMonthStart === 0 ? 6 : nextMonthStart - 1;
  const delta = 7 - endMonthStartAtDay === 7 ? 0 : 7 - endMonthStartAtDay;
  const nextMonthArray: IMonthList[] = getDaysOfMonth(delta, nextMonthY, nextMonthM + 1);

  const list: IMonthList[] = [...prevMonthArray, ...currentMonthArray, ...nextMonthArray];

  const monthList: IMonthList[][] = [];
  let weekNumber = 0;
  list.forEach((day: IMonthList, index: number) => {
    const dayNotes = notes[day.date];
    if (dayNotes) {
      day.dayEvents = dayNotes;
    }
    if (index % 7 === 0) {
      monthList.push([]);
      if (index !== 0) {
        weekNumber++;
      }
    }
    monthList[weekNumber].push(day);
  });

  return monthList;
}

function getDaysOfMonth(dayAmount: number, year: number, month: number, startDay: number = 0): IMonthList[] {
  const array: IMonthList[] = [];
  for (let i = 1; i <= dayAmount; i++) {
    array.push({
      title: `${startDay + i}`,
      date: `${year}-${month}-${startDay + i}`,
    });
  }
  return array;
}

export function getToday(): string {
  const today: Date = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

export interface ISearchEvents {
  title: string;
  date: string;
}

export function useSearchEvents(searchStr: string ): ISearchEvents[] {
  const events: string[] = useSelector(getEvents);
  const notes: INotes = useSelector(getNotes);
  const reg = new RegExp(searchStr, "i");
  const eventsFoundList: ISearchEvents[] = [];

  if (searchStr.length > 2) {
    events.forEach((eDate: string): void => {
      notes[eDate].forEach((event: IDayEvent) => {
        const t = Object.values(event);
        if (t.some(str => reg.test(str))) {
          eventsFoundList.push({
            title: event.title,
            date: eDate,
          })
        }
      })
    })
  }

  return eventsFoundList;
}

export function addNoteToStore(newNote: INotes, bufferId: number ,events: string[], notes: INotes, dispatch: Dispatch) {
  const [keyOfNotes, note]: [string, IDayEvent[]] = Object.entries(newNote)[0];
  const nextId = bufferId + 1;
  const [noteElem] = note;

  if (noteElem.id === 0) {
    noteElem.id = nextId;
    if (events.some(el => el === keyOfNotes)) {
      const newNotes: INotes = {...notes};
      const notesOfDay: IDayEvent[] = [...newNotes[keyOfNotes], ...note];
      const addingNote: INotes = {...notes, [keyOfNotes]: notesOfDay};
      dispatch(changeNote(addingNote));
      dispatch(updateBufferId(nextId));
    } else {
      const newNotes = {...notes, [keyOfNotes]: note};
      const newEvents = [...events];
      newEvents.push(keyOfNotes);
      dispatch(addEvent(newEvents));
      dispatch(changeNote(newNotes));
      dispatch(updateBufferId(nextId));
    }
  } else {
    const newNotes: INotes = {...notes};
    const notesOfDay = [...newNotes[keyOfNotes]];
    newNotes[keyOfNotes].forEach((el, i) => {
      if (el.id === noteElem.id) {
        notesOfDay[i] = {...el, description: noteElem.description};
      }
    });
    newNotes[keyOfNotes] = notesOfDay;
    dispatch(changeNote(newNotes));
  }
}

export const useOutsideClick = (fn: () => void, deps: DependencyList = []) => {
  const parent = useRef(null);

  useEffect(() => {
    function click(e: any) {
      let cur = e.target;
      let isOutside = true;

      while (cur !== document.body && cur !== null) {
        if (cur === parent.current) {
          isOutside = false;
          break;
        }

        cur = cur.parentNode;
      }

      if (isOutside) {
        fn();
      }
    }

    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, deps);

  return parent;
};
