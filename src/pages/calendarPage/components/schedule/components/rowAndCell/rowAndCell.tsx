import { IMonthList } from "../../utils";
import React, { useEffect, useState } from "react";
import s from "./style.module.scss";
import cx from "classnames";
import { IActiveElement } from "../../schedule";

interface IPropsRow extends Omit<IPropsCell, "monthDay" | "title">{
  week: IMonthList[];
  isFirstLine: boolean;
}

const weekDay = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];

export function Row(props: IPropsRow) {
  const { week, activeId, onClick, isFirstLine, today } = props;

  const renderRow = week.map((monthDay: IMonthList, i: number) => {
    const title = isFirstLine ? `${weekDay[i]}, ${monthDay.title}` : monthDay.title;
    return <Cell key={i} monthDay={monthDay} today={today} activeId={activeId} onClick={onClick} title={title} />
  })

  return <tr children={renderRow} />
}

interface IPropsCell {
  monthDay: IMonthList;
  today: string;
  activeId: string | null;
  onClick: (e: IActiveElement) => void;
  title: string;
}

function Cell(props: IPropsCell) {
  const { monthDay, activeId, onClick, title, today } = props;
  const [referenceElement, setReferenceElement] = useState<HTMLTableDataCellElement | null>(null);

  useEffect(() => {
    referenceElement?.addEventListener("keydown", handleButton);
    return function cleanup() {
      referenceElement?.removeEventListener("keydown", handleButton);
    };
  });

  const isActive = activeId === monthDay.date;
  const isToday = today === monthDay.date;

  const handleClick = () => {
    onClick({
      ref: referenceElement,
      activeId: monthDay.date,
    })
  }
  const handleButton = (e: any) => {
    if (e.keyCode === 13) {
      handleClick();
    }
    if (e.keyCode === 27) {
      onClick({
        ref: null,
        activeId: null,
      })
    }
  }

  const renderEvents = monthDay.dayEvents?.map((item, index) => {
    return <div key={index}>{`${item.title}, ${item.participants}`}</div>;
  })

  return (
    <>
      <td
        className={cx({[s.active]:isActive, [s.today]:isToday})}
        onClick={handleClick}
        ref={setReferenceElement}
        tabIndex={7}
      >
        <h3>{title}</h3>
        <div>{renderEvents}</div>
      </td>
    </>
  )
}
