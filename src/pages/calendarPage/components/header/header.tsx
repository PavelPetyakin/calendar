import React, { useState } from "react";
import cx from "classnames";
import s from "./style.module.scss";
import { Button, Input } from "../../../../components";
import { Icon } from "../../../../svg";
import { Tooltip } from "../../../../components";
import { AddEventModal, SearchModal } from "./components";
import { useSearchEvents, ISearchEvents } from "../../../../utils";

interface IPropsHeader {
  className?: string;
}

export function Header(props: IPropsHeader) {
  const { className = "" } = props;
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const [isShowAddModal, setIsShowAddModal] = useState<boolean>(false);
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
  const [searchStr, setSearchStr] = useState<string>("");
  const eventsFound: ISearchEvents[] = useSearchEvents(searchStr);
  const showEventsFound: boolean = eventsFound.length > 0;
  console.log("eventsFound:", eventsFound);

  const onChange = (value: string) => setSearchStr(value);

  return (
    <header className={cx(s.header, className)}>
      <div className={s.buttons}>
        <Button name="Добавить" color="blue" onClick={() => setIsShowAddModal(true)} tabIndex={1} ref={setButtonRef} />
        <Button name="Обновить" color="blue" onClick={() => undefined} tabIndex={2} />
      </div>
      <Input
        value={searchStr}
        onChange={onChange}
        placeholder="Событие, дата или участник"
        icon={<Icon.Search/>}
        tabIndex={3}
        ref={setInputRef}
      />
      {showEventsFound && <Tooltip targetRef={inputRef} placement={"bottom"}>
        <SearchModal eventsFoundList={eventsFound} />
      </Tooltip>}
      {isShowAddModal && <Tooltip targetRef={buttonRef} placement={"bottom-start"}>
        <AddEventModal onSave={() => undefined} onClose={() => setIsShowAddModal(false)} />
      </Tooltip>}
    </header>
  );
}
