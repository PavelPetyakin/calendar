import React from "react";
import s from "./style.module.scss";
import { Header, Navigation, Schedule } from "./components";

export function Calendar() {

  return (
    <div className={s.calendar}>
      <Header className={s.header} />
      <Navigation className={s.navigation} />
      <Schedule className={s.schedule} />
    </div>
  );
}
