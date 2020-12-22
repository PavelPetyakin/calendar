import { IMonthList } from "../../utils";
import React, { useEffect, useState } from "react";
import s from "./style.module.scss";
import cx from "classnames";
import { IActiveElement } from "../../schedule";

interface IPropsRow extends Omit<IPropsCell, "day" | "title">{
  week: IMonthList[];
  isFirstLine: boolean;
}

const weekDay = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];

export function Row(props: IPropsRow) {
  const { week, activeId, onClick, isFirstLine } = props;

  const renderRow = week.map((day: IMonthList, i: number) => {
    const title = isFirstLine ? `${weekDay[i]}, ${day.title}` : day.title;
    return <Cell key={i} day={day} activeId={activeId} onClick={onClick} title={title} />
  })

  return <tr children={renderRow} />
}

interface IPropsCell {
  day: IMonthList;
  activeId: string | null;
  onClick: (e: IActiveElement) => void;
  title: string;
}

function Cell(props: IPropsCell) {
  const { day, activeId, onClick, title } = props;
  const [referenceElement, setReferenceElement] = useState<HTMLTableDataCellElement | null>(null);

  useEffect(() => {
    referenceElement?.addEventListener("keydown", handleButton);
    return function cleanup() {
      referenceElement?.removeEventListener("keydown", handleButton);
    };
  });

  const isActive = activeId === day.date;
  const handleClick = () => {
    onClick({
      ref: referenceElement,
      activeId: day.date,
    })
  }
  const handleButton = (e: any) => {
    if (e.keyCode === 13) {
      console.log("SomeText:");
      handleClick();
    }
  }

  return (
    <>
      <td
        className={cx({[s.active]:isActive})}
        onClick={handleClick}
        ref={setReferenceElement}
        tabIndex={7}
      >
        <div>{title}</div>
        {day.title === "12" && <div>ДР, Дима Молодцов!!</div>}
        {day.title === "12" && <div>ДР, Иван Антонов!!</div>}
      </td>
    </>
  )
}
