import React from "react";
import cx from "classnames";
import s from "./style.module.scss";
import { Button } from "../../../../components";
import { Icon } from "../../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { getDate } from "../../../../reducer/selectors";
import { updateDate } from "../../../../reducer/actions";

interface IPropsNavigation {
  className?: string;
}

const months: string[] = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];

export function Navigation(props: IPropsNavigation) {
  const { className = "" } = props;
  const d: Date = useSelector(getDate);
  const dispatch = useDispatch();

  const setPrevMonth = () => {
    const date: Date = new Date(d);
    date.setMonth(date.getMonth() - 1);
    dispatch(updateDate(date));
  }

  const setNextMonth = () => {
    const date: Date = new Date(d);
    date.setMonth(date.getMonth() + 1);
    dispatch(updateDate(date));
  }

  const setCurrentDate = () => {
    const date: Date = new Date();
    dispatch(updateDate(date));
  }

  return (
    <section className={cx(s.select, className)}>
      <Button
        className={s.reverse}
        icon={<Icon.Arrow/>}
        size="little"
        onClick={setPrevMonth}
        tabIndex={4}
      />
      <time className={s.date} dateTime={"Март 2013"}>{getCurrentMonth(d)}</time>
      <Button
        icon={<Icon.Arrow/>}
        size="little"
        onClick={setNextMonth}
        tabIndex={5}
      />
      <Button name="Сегодня" size="little" onClick={setCurrentDate} tabIndex={6} />
    </section>
  );
}

function getCurrentMonth(date: Date): string {
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}
