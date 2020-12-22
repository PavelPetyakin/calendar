import React from "react";
import cx from "classnames";
import s from "./style.module.scss";
import { Button, Input } from "../../../../components";
import { Icon } from "../../../../svg";

interface IPropsHeader {
  className?: string;
}

export function Header(props: IPropsHeader) {
  const { className = "" } = props;


  return (
    <header className={cx(s.header, className)}>
      <div className={s.buttons}>
        <Button name="Добавить" color="blue" onClick={() => undefined} tabIndex={1} />
        <Button name="Обновить" color="blue" onClick={() => undefined} tabIndex={2} />
      </div>
      <Input
        value={""}
        onChange={() => undefined}
        placeholder="Событие, дата или участник"
        icon={<Icon.Search/>}
        tabIndex={3}
      />
    </header>
  );
}
