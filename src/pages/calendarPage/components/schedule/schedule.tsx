import React, { PropsWithChildren, useState } from "react";
import cx from "classnames";
import s from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, getNotes } from "../../../../reducer/selectors";
import { addEvent, addNote } from "../../../../reducer/actions";
import { useGetCurrentMonthList, IMonthList, getToday } from "./utils";
import { EventModal, Row } from "./components";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import PopperJS from '@popperjs/core';
import { IDayEvent, INotes } from "../../../../reducer/types";

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
  const { className = "" } = props;
  const [activeElement, setActiveElement] = useState<IActiveElement>(initialState);
  const dispatch = useDispatch();
  const events: string[] = useSelector(getEvents);
  const notes: INotes = useSelector(getNotes);
  const currentMonthList = useGetCurrentMonthList();
  const today = getToday();

  const openModal = (id: IActiveElement) => setActiveElement(id);
  const closeModal = () => setActiveElement(initialState);
  //TODO переделать
  const createNote = (newNote: INotes) => {
    const keyNote: [string, IDayEvent[]][] = Object.entries(newNote);

    if (events.some(el => el === keyNote[0][0])) {
      const newNotes: INotes = {...notes};
      const x: IDayEvent[] = [...newNotes[keyNote[0][0]],...keyNote[0][1]];
      const y: INotes = {...notes, [keyNote[0][0]]: x};
      dispatch(addNote(y));
    } else {
      const newNotes = {...notes, [keyNote[0][0]]: keyNote[0][1]};
      const e = [...events];
      e.push(keyNote[0][0]);
      dispatch(addEvent(e));
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
      {activeElement.activeId && <Tooltip targetRef={activeElement.ref}>
        <EventModal activeId={activeElement.activeId} onSave={createNote} onRemove={() => undefined} onClose={closeModal}/>
      </Tooltip>}
    </div>
  );
}

interface IPropsTooltip {
  targetRef: HTMLTableDataCellElement | null;
  placement?: PopperJS.Placement;
}

function Tooltip(props: PropsWithChildren<IPropsTooltip>) {
  const { targetRef, children, placement = "right" } = props;
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(targetRef, popperElement, {
    modifiers: [
      { name: "arrow", options: { element: arrowElement }},
      { name: "offset", options: { offset: [0, 15]}}
    ],
    placement
  });

  return (
    ReactDOM.createPortal(
      <div
        className={s.popper}
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <div className={s.arrow} ref={setArrowElement} style={styles.arrow} />
        {children}
      </div>,
      document.body
    )
  )
}
