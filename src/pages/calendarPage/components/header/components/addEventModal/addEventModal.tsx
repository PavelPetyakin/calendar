import React, { useState } from "react";
import { Button, Input } from "../../../../../../components";
import s from "./style.module.scss";
import { Icon } from "../../../../../../svg";

interface IPropsAddEventModal {
  onSave: () => void;
  onClose: () => void;
}

export function AddEventModal(props: IPropsAddEventModal) {
  const { onSave, onClose } = props;
  const [value, setValue] = useState<string>("");
  const handleChange = (val: string) => setValue(val);
  const handleSave = () => {
    console.log("AddEventModal - handleSave:", value);
    console.log("Date:", new Date(value));
    // onSave();

  };

  return (
    <div className={s.container}>
      <Icon.Cancel className={s.cancel} onClick={onClose} tabIndex={5}/>
      <Input className={s.input} value={value} onChange={handleChange} placeholder="5 марта, 14:00, День Рождения"
             tabIndex={3}/>
      <Button className={s.button} name="Создать" color="default" size="little" onClick={handleSave} tabIndex={4}/>
    </div>
  );
}
