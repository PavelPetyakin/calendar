import React, { useState } from "react";
import cx from "classnames";
import s from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, getNotes } from "../../../../reducer/selectors";
import { addEvent, addNote } from "../../../../reducer/actions";
import { useGetCurrentMonthList, IMonthList, getToday } from "../../../../utils";
import { EventModal, Row } from "./components";
import { IDayEvent, INotes } from "../../../../reducer/types";
import { Tooltip } from "../../../../components";

interface IPropsSchedule {
  className?: string;
}

export interface IActiveElement {
  ref: HTMLTableDataCellElement | null;
  activeId: string | null;
}

const initialState: IActiveElement = {
  ref: null,
  activeId: null,
}

export function Schedule(props: IPropsSchedule) {
  const {className = ""} = props;
  const [activeElement, setActiveElement] = useState<IActiveElement>(initialState);
  const dispatch = useDispatch();
  const events: string[] = useSelector(getEvents);
  const notes: INotes = useSelector(getNotes);
  const currentMonthList = useGetCurrentMonthList();
  const today = getToday();

  const openModal = (id: IActiveElement) => setActiveElement(id);
  const closeModal = () => setActiveElement(initialState);

  const createNote = (newNote: INotes) => {
    const [keyOfNotes, note]: [string, IDayEvent[]] = Object.entries(newNote)[0];

    if (events.some(el => el === keyOfNotes)) {
      const newNotes: INotes = {...notes};
      const x: IDayEvent[] = [...newNotes[keyOfNotes], ...note];
      const y: INotes = {...notes, [keyOfNotes]: x};
      dispatch(addNote(y));
    } else {
      const newNotes = {...notes, [keyOfNotes]: note};
      const newEvents = [...events];
      newEvents.push(keyOfNotes);
      dispatch(addEvent(newEvents));
      dispatch(addNote(newNotes));
    }
  }

  return (
    <div className={cx(s.container, className)}>
      <table>
        <tbody>
          {currentMonthList.map((week: IMonthList[], index: number) => {
            return (
              <Row
                key={index}
                week={week}
                today={today}
                activeId={activeElement.activeId}
                onClick={openModal}
                isFirstLine={index === 0}
              />
            )
          })}
        </tbody>
      </table>
      {activeElement.activeId && <Tooltip targetRef={activeElement.ref} placement={"right"}>
        <EventModal activeId={activeElement.activeId} onSave={createNote} onRemove={() => undefined} onClose={closeModal}/>
      </Tooltip>}
    </div>
  );
}
