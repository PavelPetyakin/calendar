import React, { ReactElement, SyntheticEvent } from "react";
import s from "./style.module.scss";

interface IInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  icon?: ReactElement;
  tabIndex?: number;
  multiline?: boolean;
  type?: string;
}

export function Input(props: IInputProps) {
  const { value, onChange, placeholder, icon, tabIndex = 0, multiline = false, type = "text" } = props;
  const handleChange = (event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.currentTarget.value);

  const render = multiline ?
    <textarea
      className={s.area}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      tabIndex={tabIndex}
    /> :
    <label className={s.container}>
      {icon}
      <input
        className={s.input}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        tabIndex={tabIndex}
      />
    </label>

  return render;
}
