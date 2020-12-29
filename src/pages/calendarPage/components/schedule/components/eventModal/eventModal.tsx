import React, { useState } from "react";
import s from "./style.module.scss";
import { Button, Input } from "../../../../../../components";
import { IDayEvent, INotes } from "../../../../../../reducer/types";

interface IPropsEventModal {
  activeId: string | null;
  onSave: (note: INotes) => void;
  onRemove: () => void;
}

const initNote: IDayEvent = {
  title: "",
  time: "",
  participants: "",
  description: "",
}

export function EventModal(props: IPropsEventModal) {
  const { activeId, onSave, onRemove } = props;
  const [note, setNote] = useState<IDayEvent>(initNote);

  const handleChange = (key: string) => (val: string) => {
    const updatedNote: IDayEvent = { ...note, [key]: val };
    setNote(updatedNote);
  };

  const handleSave = () => {
    if (activeId) {
        const savedNote: INotes = {[activeId]: [note]};
        onSave(savedNote);
    }
  };

  return (
    <div className={s.container}>
      <Input value={note.title} onChange={handleChange("title")} placeholder={"Событие"} tabIndex={41}/>
      <Input type={"time"} value={note.time} onChange={handleChange("time")} placeholder={"Время"} tabIndex={41}/>
      <Input value={note.participants} onChange={handleChange("participants")} placeholder={"Имена участников"} tabIndex={42}/>
      <Input value={note.description} onChange={handleChange("description")} placeholder={"Описание"} tabIndex={43} multiline={true}/>
      <div className={s.buttons}>
        <Button name="Готово" size="little" onClick={handleSave} tabIndex={44} />
        <Button name="Удалить" size="little" onClick={onRemove} tabIndex={45} />
      </div>
    </div>
  );
}
