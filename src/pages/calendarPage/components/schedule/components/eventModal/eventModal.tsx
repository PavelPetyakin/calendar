import React, { useEffect, useRef, useState } from "react";
import s from "./style.module.scss";
import { Button, Input } from "../../../../../../components";
import { IDayEvent, INotes } from "../../../../../../reducer/types";
import { IActiveElement } from "../../schedule";
import { getDateDescription } from "../../../../../../utils";

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

interface IPropsEventModal extends Omit<IActiveElement, "ref"> {
  onSave: (note: INotes) => void;
  onRemove: (activeId: string | null, id: number | undefined) => void;
  notes: INotes;
}

const initNote: IDayEvent = {
  title: "",
  id: 0,
  participants: "",
  description: "",
}

export function EventModal(props: IPropsEventModal) {
  const { activeId, id, notes, onSave, onRemove } = props;
  const [note, setNote] = useState<IDayEvent>(initNote);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeId && notes[activeId]) {
      const editNote: IDayEvent | undefined = notes[activeId].find(note => note.id === id);
      if (editNote) {
        setNote(editNote);
      } else {
        setNote(initNote);
      }
    } else {
      setNote(initNote);
    }
  },[activeId, id, notes]);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, [activeId])

  const handleChange = (key: string) => (val: string) => {
    const updatedNote: IDayEvent = { ...note, [key]: val };
    setNote(updatedNote);
  };

  const handleSave = () => {
    if ((note.title || note.description || note.participants) && activeId) {
        const savedNote: INotes = {[activeId]: [note]};
        onSave(savedNote);
    }
  };

  const handleRemove = () => onRemove(activeId, id);


  if (id && activeId) {
    return (
      <div className={s.container}>
        <h3 className={s.title} children={note.title} />
        <h6 className={s.date} children={getDateDescription(activeId, months)} />
        <div className={s.participants}>
          <p>Участники:</p>
          <span>{note.participants}</span>
        </div>
        <Input value={note.description} onChange={handleChange("description")} placeholder={"Описание"} tabIndex={43} multiline={true}/>
        <div className={s.buttons}>
          <Button name="Готово" size="little" onClick={handleSave} tabIndex={44} />
          <Button name="Удалить" size="little" onClick={handleRemove} tabIndex={45} />
        </div>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <Input value={note.title} ref={ref} onChange={handleChange("title")} placeholder={"Событие"} tabIndex={41}/>
      <Input value={note.participants} onChange={handleChange("participants")} placeholder={"Имена участников"} tabIndex={42}/>
      <Input value={note.description} onChange={handleChange("description")} placeholder={"Описание"} tabIndex={43} multiline={true}/>
      <div className={s.buttons}>
        <Button name="Готово" size="little" onClick={handleSave} tabIndex={44} />
        <Button name="Удалить" size="little" onClick={handleRemove} tabIndex={45} />
      </div>
    </div>
  );
}
