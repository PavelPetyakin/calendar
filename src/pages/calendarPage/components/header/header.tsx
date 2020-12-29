import React, { useState } from "react";
import cx from "classnames";
import s from "./style.module.scss";
import { Button, Input } from "../../../../components";
import { Icon } from "../../../../svg";
import { Tooltip } from "../../../../components";
import { AddEventModal, SearchModal } from "./components";
import { useSearchEvents, ISearchEvents, addNoteToStore } from "../../../../utils";
import { INotes} from "../../../../reducer/types";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, getNotes } from "../../../../reducer/selectors";
import { Dispatch } from "redux";

interface IPropsHeader {
  className?: string;
}

export function Header(props: IPropsHeader) {
  const { className = "" } = props;
  const dispatch: Dispatch = useDispatch();
  const events: string[] = useSelector(getEvents);
  const notes: INotes = useSelector(getNotes);

  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const [isShowAddModal, setIsShowAddModal] = useState<boolean>(false);
  const handleOpenModal = () => setIsShowAddModal(true);
  const handleCloseModal = () => setIsShowAddModal(false);

  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
  const [searchStr, setSearchStr] = useState<string>("");
  const onChange = (value: string) => setSearchStr(value);
  const eventsFound: ISearchEvents[] = useSearchEvents(searchStr);
  const showEventsFound: boolean = eventsFound.length > 0;
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const createNote = (newNote: INotes) => addNoteToStore(newNote, events, notes, dispatch);

  return (
    <header className={cx(s.header, className)}>
      <div className={s.buttons}>
        <Button name="Добавить" color="blue" onClick={handleOpenModal} tabIndex={1} ref={setButtonRef} />
        <Button name="Обновить" color="blue" onClick={() => undefined} tabIndex={2} />
      </div>
      <Input
        value={searchStr}
        onChange={onChange}
        placeholder="Событие, дата или участник"
        icon={<Icon.Search/>}
        tabIndex={3}
        ref={setInputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Tooltip targetRef={inputRef} placement={"bottom"} isShow={isFocused && showEventsFound}>
        <SearchModal eventsFoundList={eventsFound} />
      </Tooltip>
      <Tooltip targetRef={buttonRef} placement={"bottom-start"} isShow={isShowAddModal} onClose={handleCloseModal}>
        <AddEventModal onSave={createNote} />
      </Tooltip>
    </header>
  );
}
