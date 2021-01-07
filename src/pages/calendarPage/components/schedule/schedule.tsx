import React, { useEffect, useState } from "react";
import cx from "classnames";
import s from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {getBufferId, getDate, getEvents, getNotes} from "../../../../reducer/selectors";
import { useGetCurrentMonthList, IMonthList, getToday, addNoteToStore } from "../../../../utils";
import { EventModal, Row } from "./components";
import { INotes } from "../../../../reducer/types";
import { Tooltip } from "../../../../components";
import { Dispatch } from "redux";
import { changeNote } from "../../../../reducer/actions";

interface IPropsSchedule {
  className?: string;
}

export interface IActiveElement {
  ref: HTMLTableDataCellElement | null;
  activeId: string | null;
  id?: number;
}

const initialState: IActiveElement = {
  ref: null,
  activeId: null,
}

export function Schedule(props: IPropsSchedule) {
  const {className = ""} = props;
  const [activeElement, setActiveElement] = useState<IActiveElement>(initialState);
  const dispatch: Dispatch = useDispatch();
  const bufferId: number = useSelector(getBufferId);
  const events: string[] = useSelector(getEvents);
  const notes: INotes = useSelector(getNotes);
  const d: Date = useSelector(getDate);
  const currentMonthList = useGetCurrentMonthList();
  const today = getToday();

  const openModal = (id: IActiveElement) => setActiveElement(id);
  const closeModal = () => setActiveElement(initialState);

  useEffect(closeModal, [d]);

  const createNote = (newNote: INotes) => addNoteToStore(newNote, bufferId, events, notes, dispatch);
  const removeNote = (activeId: string | null, id: number | undefined) => {
    if (activeId && id) {
      const newNotes: INotes = {...notes};
      const notesOfDay = [...newNotes[activeId]];
      const index = notesOfDay.findIndex(el => el.id === id);
      if (index !== -1) {
        notesOfDay.splice(index, 1)
        newNotes[activeId] = notesOfDay;
        dispatch(changeNote(newNotes));
        closeModal();
      }
    } else {
      closeModal();
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
        <Tooltip targetRef={activeElement.ref} placement={"right"} isShow={!!activeElement.activeId} onClose={closeModal}>
          <EventModal activeId={activeElement.activeId} id={activeElement.id} notes={notes} onSave={createNote} onRemove={removeNote}/>
        </Tooltip>
      </div>
  );
}
