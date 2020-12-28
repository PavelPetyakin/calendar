import React from "react";
import "./style.module.scss";
import { ISearchEvents } from "../../../../../../utils";

interface IPropsEventModal {
  eventsFoundList: ISearchEvents[];
}

const months: string[] = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря"
];

export function SearchModal(props: IPropsEventModal) {
  const { eventsFoundList } = props;

  const renderList = eventsFoundList.map((el, index) => {
    return (
      <li key={index}>
        <div>
          <h4>{el.title}</h4>
          <p>{getDateDescription(el.date)}</p>
        </div>
      </li>
    )
  })

  return (
    <ul>
      {renderList}
    </ul>
  );
}

function getDateDescription(d: string): string {
  const date: Date = new Date(d);
  return `${date.getDate()} ${months[date.getMonth()]}`;
}