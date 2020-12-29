import React, { useEffect, useState } from "react";
import cx from "classnames";
import s from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getDate, getEvents, getNotes } from "../../../../reducer/selectors";
import { useGetCurrentMonthList, IMonthList, getToday, addNoteToStore } from "../../../../utils";
import { EventModal, Row } from "./components";
import { INotes } from "../../../../reducer/types";
import { Tooltip } from "../../../../components";
import { Dispatch } from "redux";

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
  const dispatch: Dispatch = useDispatch();
  const events: string[] = useSelector(getEvents);
  const notes: INotes = useSelector(getNotes);
  const d: Date = useSelector(getDate);
  const currentMonthList = useGetCurrentMonthList();
  const today = getToday();

  const openModal = (id: IActiveElement) => setActiveElement(id);
  const closeModal = () => setActiveElement(initialState);

  useEffect(closeModal, [d]);

  const createNote = (newNote: INotes) => addNoteToStore(newNote, events, notes, dispatch);

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
          <EventModal activeId={activeElement.activeId} onSave={createNote} onRemove={() => undefined}/>
        </Tooltip>
      </div>
  );
}
