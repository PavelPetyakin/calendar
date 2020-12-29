import React, { ReactElement, SyntheticEvent, forwardRef, ForwardedRef } from "react";
import s from "./style.module.scss";
import cx from "classnames";

interface IInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  icon?: ReactElement;
  tabIndex?: number;
  multiline?: boolean;
  type?: string;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Input = forwardRef((props: IInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { value, onChange, placeholder, icon, tabIndex = 0, multiline = false, type = "text", className = "", onFocus, onBlur } = props;
  const handleChange = (event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.currentTarget.value);

  const render = multiline ?
    <textarea
      className={cx(s.area, className)}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      tabIndex={tabIndex}
    /> :
    <label className={s.container}>
      {icon}
      <input
        className={cx(s.input, className)}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        tabIndex={tabIndex}
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </label>

  return render;
})
