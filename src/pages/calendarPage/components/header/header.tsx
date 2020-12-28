import React, { useState } from "react";
import cx from "classnames";
import s from "./style.module.scss";
import { Button, Input } from "../../../../components";
import { Icon } from "../../../../svg";
import { Tooltip } from "../../../../components";
import { SearchModal } from "./components";
import { useSearchEvents, ISearchEvents } from "../../../../utils";

interface IPropsHeader {
  className?: string;
}

export function Header(props: IPropsHeader) {
  const { className = "" } = props;
  const [ref, setRef] = useState<HTMLInputElement | null>(null);
  const [searchStr, setSearchStr] = useState<string>("");
  const eventsFound: ISearchEvents[] = useSearchEvents(searchStr);
  const showEventsFound: boolean = eventsFound.length > 0;
  console.log("eventsFound:", eventsFound);

  const onChange = (value: string) => setSearchStr(value);

  return (
    <header className={cx(s.header, className)}>
      <div className={s.buttons}>
        <Button name="Добавить" color="blue" onClick={() => undefined} tabIndex={1} />
        <Button name="Обновить" color="blue" onClick={() => undefined} tabIndex={2} />
      </div>
      <Input
        value={searchStr}
        onChange={onChange}
        placeholder="Событие, дата или участник"
        icon={<Icon.Search/>}
        tabIndex={3}
        ref={setRef}
      />
      {showEventsFound && <Tooltip targetRef={ref} placement={"bottom"}>
        <SearchModal eventsFoundList={eventsFound} />
      </Tooltip>}
    </header>
  );
}
