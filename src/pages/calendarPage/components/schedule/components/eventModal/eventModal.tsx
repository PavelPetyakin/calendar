import React, { useState } from "react";
import s from "./style.module.scss";
import { Button, Input, ShadowBox } from "../../../../../../components";
import { Icon } from "../../../../../../svg";
import { IDayEvent, INotes } from "../../../../../../reducer/types";

interface IPropsEventModal {
  activeId: string;
  onSave: (note: INotes) => void;
  onRemove: () => void;
  onClose: () => void;
}

const initNote: IDayEvent = {
  title: "",
  time: "",
  participants: "",
  description: "",
}

export function EventModal(props: IPropsEventModal) {
  const { activeId, onSave, onRemove, onClose } = props;
  const [note, setNote] = useState<IDayEvent>(initNote);

  const handleChange = (key: string) => (val: string) => {
    const updatedNote: IDayEvent = { ...note, [key]: val };
    setNote(updatedNote);
  };

  const handleSave = () => {
    const savedNote: INotes = {[activeId]: [note]};
    onSave(savedNote);
  };

  return (
    <ShadowBox>
      <Icon.Cancel className={s.cancel} onClick={onClose} tabIndex={46}/>
      <Input value={note.title} onChange={handleChange("title")} placeholder={"Событие"} tabIndex={41}/>
      <Input type={"time"} value={note.time} onChange={handleChange("time")} placeholder={"Время"} tabIndex={41}/>
      <Input value={note.participants} onChange={handleChange("participants")} placeholder={"Имена участников"} tabIndex={42}/>
      <Input value={note.description} onChange={handleChange("description")} placeholder={"Описание"} tabIndex={43} multiline={true}/>
      <div className={s.buttons}>
        <Button name="Готово" size="little" onClick={handleSave} tabIndex={44} />
        <Button name="Удалить" size="little" onClick={onRemove} tabIndex={45} />
      </div>
    </ShadowBox>
  );
}
