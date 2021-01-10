import React from "react";
import "./style.module.scss";
import { ISearchEvents, getDateDescription } from "../../../../../../utils";

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
          <p>{getDateDescription(el.date, months)}</p>
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
