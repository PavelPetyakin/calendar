import React, {useEffect, useState} from "react";
import s from "./style.module.scss";
import { Button, Input } from "../../../../../../components";
import { IDayEvent, INotes } from "../../../../../../reducer/types";
import { IActiveElement } from "../../schedule";

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

  const handleRemove = () => onRemove(activeId, id);


  if (id) {
    return (
      <div className={s.container}>
        <div children={note.title} />
        <div children={note.participants} />
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
      <Input value={note.title} onChange={handleChange("title")} placeholder={"Событие"} tabIndex={41}/>
      <Input value={note.participants} onChange={handleChange("participants")} placeholder={"Имена участников"} tabIndex={42}/>
      <Input value={note.description} onChange={handleChange("description")} placeholder={"Описание"} tabIndex={43} multiline={true}/>
      <div className={s.buttons}>
        <Button name="Готово" size="little" onClick={handleSave} tabIndex={44} />
        <Button name="Удалить" size="little" onClick={handleRemove} tabIndex={45} />
      </div>
    </div>
  );
}
