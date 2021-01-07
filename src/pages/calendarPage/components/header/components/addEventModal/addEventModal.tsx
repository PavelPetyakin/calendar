import React, { useState } from "react";
import { Button, Input } from "../../../../../../components";
import s from "./style.module.scss";
import { INotes } from "../../../../../../reducer/types";

interface IPropsAddEventModal {
  onSave: (event: INotes) => void;
}

export function AddEventModal(props: IPropsAddEventModal) {
  const { onSave } = props;
  const [value, setValue] = useState<string>("");
  const handleChange = (val: string) => setValue(val);
  const handleSave = () => value && onSave(createEvent(value));

  return (
    <div className={s.container}>
      <Input className={s.input} value={value} onChange={handleChange} placeholder="5 марта, 14:00, День Рождения"
             tabIndex={3}/>
      <Button className={s.button} name="Создать" color="default" size="little" onClick={handleSave} tabIndex={4}/>
    </div>
  );
}

const months: string[] = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря"
];

function createEvent(str: string): INotes {
  const [d, title = ""] = str.split(",");
  const [day, month] = d.split(" ");
  const monthIndex = months.findIndex(m => m === month.toLowerCase());
  const date: Date = new Date(2021, monthIndex, parseInt(day, 10));
  const key: string = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  return {
    [key]: [{
      title,
      id: 0,
      participants: "",
      description: "",
    }]
  }
}
